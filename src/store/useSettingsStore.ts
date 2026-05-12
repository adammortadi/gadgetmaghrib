import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface SiteSettings {
  backgroundColor: string;
  useBackgroundImage: boolean;
  timerHours: number;
  timerMinutes: number;
  timerSeconds: number;
  showTimer: boolean;
}

interface SettingsState {
  settings: SiteSettings;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  backgroundColor: '#0a192f',
  useBackgroundImage: true,
  timerHours: 0,
  timerMinutes: 59,
  timerSeconds: 36,
  showTimer: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      isLoading: true,

      fetchSettings: async () => {
        try {
          const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'site_config')
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (data) {
            set({ settings: { ...DEFAULT_SETTINGS, ...data.value }, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error fetching settings:', error);
          set({ isLoading: false });
        }
      },

      updateSettings: async (newSettings) => {
        const updated = { ...get().settings, ...newSettings };
        set({ settings: updated });

        try {
          const { error } = await supabase
            .from('settings')
            .upsert({ key: 'site_config', value: updated }, { onConflict: 'key' });
          
          if (error) throw error;
        } catch (error) {
          console.error('Error updating settings:', error);
        }
      },
    }),
    {
      name: 'gdm-settings',
    }
  )
);
