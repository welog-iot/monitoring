import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useI18n } from '@/i18n/i18n-context';
import { useTheme } from '@/hooks/use-theme';

export function LanguageSwitcher() {
  const theme = useTheme();
  const { locale, setLocale, t } = useI18n();

  return (
    <View accessibilityRole="radiogroup" style={[styles.container, { borderColor: theme.border }]}>
      <LanguageOption
        label={t('languageItalian')}
        selected={locale === 'it'}
        onPress={() => setLocale('it')}
      />
      <LanguageOption
        label={t('languageEnglish')}
        selected={locale === 'en'}
        onPress={() => setLocale('en')}
      />
    </View>
  );
}

function LanguageOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && { backgroundColor: theme.accentSoft },
        pressed && styles.pressed,
      ]}>
      <ThemedText type="small" style={{ color: selected ? theme.accent : theme.textSecondary }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.one,
  },
  option: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
