import { SymbolView } from 'expo-symbols';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useI18n } from '@/i18n/i18n-context';
import { useTheme } from '@/hooks/use-theme';

export default function AboutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  return (
    <ThemedView style={styles.container}>
      <View
        style={[
          styles.inner,
          Platform.select({
            web: { paddingTop: Spacing.six },
            default: { paddingTop: insets.top || Spacing.four },
          }),
        ]}>
        <ThemedView style={styles.hero}>
          <View style={styles.iconWrap(theme.accent, theme.accentSoft)}>
            <SymbolView
              tintColor={theme.accent}
              name={{ ios: 'bridge', android: 'bridge', web: 'git-merge' }}
              size={40}
            />
          </View>
          <ThemedText type="subtitle">{t('appName')}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.tagline}>
            {t('aboutTagline')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="smallBold">{t('howItWorks')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.body}>
            {t('howItWorksBody')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="smallBold">{t('sensorLimits')}</ThemedText>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('minInclinometers')}
            </ThemedText>
            <ThemedText type="smallBold">2</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('maxInclinometers')}
            </ThemedText>
            <ThemedText type="smallBold">5</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('unit')}
            </ThemedText>
            <ThemedText type="smallBold">{t('radians')}</ThemedText>
          </View>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: BottomTabInset + Spacing.three,
    alignItems: 'center',
  },
  inner: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  iconWrap: (accent: string, accentSoft: string) => ({
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: accentSoft,
    borderWidth: 1,
    borderColor: accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  }),
  tagline: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
});
