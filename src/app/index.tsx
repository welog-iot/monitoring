import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InclinometerInput, InclinometerReading } from '@/components/inclinometer-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useI18n } from '@/i18n/i18n-context';
import { useTheme } from '@/hooks/use-theme';

const MIN_SENSORS = 2;
const MAX_SENSORS = 5;
const GREEK = ['α', 'β', 'γ', 'δ', 'ε'];

function makeReading(index: number, label: string): InclinometerReading {
  return { id: `sensor-${index}-${Date.now()}`, label, radians: '' };
}

export default function MonitorScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const [readings, setReadings] = useState<InclinometerReading[]>(() => [
    makeReading(0, t('sensorLabel', { greek: GREEK[0] })),
    makeReading(1, t('sensorLabel', { greek: GREEK[1] })),
  ]);

  const canAdd = readings.length < MAX_SENSORS;
  const canRemove = readings.length > MIN_SENSORS;

  const addSensor = () => {
    if (!canAdd) return;
    setReadings((prev) => [
      ...prev,
      makeReading(prev.length, t('sensorLabel', { greek: GREEK[prev.length] })),
    ]);
  };

  const removeSensor = (id: string) => {
    if (!canRemove) return;
    setReadings((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRadians = (id: string, radians: string) => {
    setReadings((prev) => prev.map((r) => (r.id === id ? { ...r, radians } : r)));
  };

  const validCount = readings.filter((r) => r.radians.trim() !== '').length;

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        Platform.select({
          web: { paddingTop: Spacing.six, paddingBottom: Spacing.four },
          default: { paddingTop: insets.top || Spacing.four },
        }),
      ]}>
      <ThemedView style={styles.inner}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle">{t('bridgeDeflection')}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>
            {t('monitorSubtitle')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="smallBold">{t('inclinometers')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {readings.length}/{MAX_SENSORS}
            </ThemedText>
          </View>

          <View style={styles.sensorsList}>
            {readings.map((reading, index) => (
              <InclinometerInput
                key={reading.id}
                reading={reading}
                index={index}
                onChange={(value) => updateRadians(reading.id, value)}
                onRemove={() => removeSensor(reading.id)}
              />
            ))}
          </View>

          {canAdd ? (
            <Pressable
              style={({ pressed }) => [styles.addButton(theme), pressed && styles.pressed]}
              onPress={addSensor}>
              <SymbolView
                tintColor={theme.accent}
                name={{ ios: 'plus', android: 'add', web: 'plus' }}
                size={16}
              />
              <ThemedText type="small" style={{ color: theme.accent }}>
                {t('addInclinometer')}
              </ThemedText>
            </Pressable>
          ) : (
            <ThemedText type="small" themeColor="textSecondary" style={styles.maxNote}>
              {t('maxReached', { max: MAX_SENSORS })}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.card}>
          <View style={styles.cardHeader}>
            <ThemedText type="smallBold">{t('deflectionGraph')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('activeCount', { count: validCount })}
            </ThemedText>
          </View>

          <View style={styles.graphPlaceholder(theme)}>
            <SymbolView
              tintColor={theme.textSecondary}
              name={{
                ios: 'chart.line.uptrend.xyaxis',
                android: 'show_chart',
                web: 'line-chart',
              }}
              size={48}
            />
            <ThemedText type="small" themeColor="textSecondary" style={styles.placeholderText}>
              {t('graphComingSoon')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.placeholderSubtext}>
              {t('graphSubtext', { count: readings.length })}
            </ThemedText>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: BottomTabInset + Spacing.three,
  },
  inner: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.one,
    paddingTop: Spacing.two,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sensorsList: {
    gap: Spacing.two,
  },
  addButton: (theme: any) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: theme.accent,
    borderStyle: 'dashed',
  }),
  pressed: {
    opacity: 0.6,
  },
  maxNote: {
    textAlign: 'center',
    paddingVertical: Spacing.two,
  },
  graphPlaceholder: (theme: any) => ({
    height: 260,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: theme.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
  }),
  placeholderText: {
    fontWeight: 600,
  },
  placeholderSubtext: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
  },
});
