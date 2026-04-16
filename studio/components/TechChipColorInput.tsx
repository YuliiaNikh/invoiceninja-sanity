import {useMemo} from 'react'
import {set, unset, type StringInputProps} from 'sanity'
import {Box, Button, Flex, Stack, Text} from '@sanity/ui'

import {TECH_CHIP_COLOR_OPTIONS, TECH_CHIP_COLOR_HEX} from '../constants/techChipColors'

function resolveHex(value: string | undefined): string {
  if (!value) return '#2563eb'
  if (TECH_CHIP_COLOR_HEX[value]) return TECH_CHIP_COLOR_HEX[value]
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) return value
  return '#2563eb'
}

export function TechChipColorInput(props: StringInputProps) {
  const {value, onChange, readOnly} = props
  const hexForPicker = useMemo(() => resolveHex(value), [value])
  const isCustomHex = Boolean(value && /^#[0-9A-Fa-f]{6}$/.test(value))

  return (
    <Stack space={4}>
      <Box>
        <Text size={1} weight="semibold">
          Presets
        </Text>
        <Text muted size={1}>
          Design tokens and common tech brand colors
        </Text>
        <Flex gap={2} marginTop={3} wrap="wrap">
          {TECH_CHIP_COLOR_OPTIONS.map((opt) => {
            const selected = value === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                title={opt.title}
                aria-label={opt.title}
                aria-pressed={selected}
                disabled={readOnly}
                onClick={() => onChange(set(opt.value))}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: opt.hex,
                  border: selected ? '2px solid var(--card-fg-color)' : '1px solid rgba(127,127,127,0.35)',
                  cursor: readOnly ? 'default' : 'pointer',
                  padding: 0,
                  boxSizing: 'border-box',
                }}
              />
            )
          })}
        </Flex>
      </Box>

      <Box>
        <Text size={1} weight="semibold">
          Custom color
        </Text>
        <Flex align="center" gap={3} marginTop={3}>
          <input
            type="color"
            value={hexForPicker}
            disabled={readOnly}
            aria-label="Custom chip color"
            onChange={(e) => onChange(set(e.target.value))}
            style={{
              width: 44,
              height: 36,
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: readOnly ? 'default' : 'pointer',
            }}
          />
          <Text muted size={1}>
            {isCustomHex ? value : value ? `${value} (${hexForPicker})` : `Default preview ${hexForPicker} if empty`}
          </Text>
        </Flex>
      </Box>

      {!readOnly && value ? (
        <Button mode="ghost" text="Clear color" onClick={() => onChange(unset())} />
      ) : null}
    </Stack>
  )
}
