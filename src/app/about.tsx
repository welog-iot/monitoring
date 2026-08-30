import { SymbolView } from 'expo-symbols';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AboutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
          <ThemedText type="subtitle">WeLog Monitoring</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.tagline}>
            Structural deflection tracking for bridges.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="smallBold">How it works</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.body}>
            Inclinometers mounted along a bridge measure angular rotation. Combined, these
            readings describe how the structure deflects under load. Enter each sensor&apos;s
            angle in radians on the Monitor tab; a deflection curve will be plotted here soon.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="smallBold">Sensor limits</ThemedText>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              Minimum inclinometers
            </ThemedText>
            <ThemedText type="smallBold">2</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              Maximum inclinometers
            </ThemedText>
            <ThemedText type="smallBold">5</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText type="small" themeColor="textSecondary">
              Unit
            </ThemedText>
            <ThemedText type="smallBold">radians</ThemedText>
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
