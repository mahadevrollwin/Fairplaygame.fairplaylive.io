'use client'

import {createContext, useContext} from 'react'
import type {SiteSettings} from '@/lib/types'
import {fallbackSiteSettings} from '@/lib/fallbacks'
import {WHATSAPP_URL} from '@/data/site'

const SiteSettingsContext = createContext<SiteSettings>(fallbackSiteSettings)

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings
  children: React.ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}

export function useWhatsAppUrl() {
  return WHATSAPP_URL
}
