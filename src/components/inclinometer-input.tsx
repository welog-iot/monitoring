import { useState } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useI18n } from '@/i18n/i18n-context';
import { useTheme } from '@/hooks/use-theme';

export type InclinometerReading = {
  id: string;
  label: string;
  radians: string;
};

type InclinometerInputProps = {
  reading: InclinometerReading;
  index: number;
  onChange: (radians: string) => void;
  onRemove: () => void;
};

export function InclinometerInput({ reading, index, onChange, onRemove }: InclinometerInputProps) {
  const theme = useTheme();
  const { t } = useI18n();
  const [focused, setFocused] = useState(false);

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.labelBadge(theme.accent, theme.accentSoft)}>
          <ThemedText type="smallBold" style={styles.labelText}>
            {reading.label}
          </ThemedText>
        </View>
        <Pressable
          hitSlop={Spacing.three}
          style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}
          onPress={onRemove}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('remove')}
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={reading.radians}
          onChangeText={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0.0000"
          placeholderTextColor={theme.textSecondary}
          keyboardType={Platform.select({ web: 'default', default: 'numeric' })}
          inputMode="decimal"
          selectTextOnFocus
          style={styles.input(theme, focused)}
        />
        <ThemedText type="small" themeColor="textSecondary" style={styles.unit}>
          {t('unitRad')}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelBadge: (accent: string, accentSoft: string) => ({
    backgroundColor: accentSoft,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderWidth: 1,
    borderColor: accent,
  }),
  labelText: {
    color: '#0274DF',
  },
  removeButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: (theme: any, focused: boolean) => ({
    flex: 1,
    fontFamily: Platform.select({ web: 'var(--font-mono)', default: 'monospace' }),
    fontSize: 16,
    color: theme.text,
    borderWidth: 1,
    borderColor: focused ? theme.accent : theme.border,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Platform.select({ web: Spacing.two, default: Spacing.three }),
    outlineWidth: 0,
  }),
  unit: {
    fontSize: 14,
  },
});
