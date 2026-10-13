import { useEffect, useState } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { IconFolderOpen, IconPanelLeft } from '../core/icon-compat.ts'
import { getFrame } from '../platform/frame.ts'
import { NS } from '../i18n/locales.ts'
import { openFilesPanel } from './open-files-panel.ts'

/** Full props for the session-header directory toggle. */
export interface MobileNavToggleProps extends PropsRuntime<'conversation.session.header.actions'>, PropsLocale<typeof NS> {
  /** Bound ctx.layout.toggleSidebar(). */
  toggleSidebar: () => void
}

/**
 * Mobile-only icon buttons next to the session title:
 * - toggle: opens the directory drawer on narrow screens.
 * - files: opens the file browser directly — one tap, no drawer round-trip.
 *   Which surface that is (host right sidebar vs. the third-party explorer
 *   sheet) is decided in open-files-panel.ts. The hero/blank phases have no
 *   session header, so this control is absent there; the files entry in those
 *   phases is the right-edge leftward swipe (sidebar-swipe.ts).
 * Hidden entirely on wide screens (CSS media query).
 */
export function MobileNavToggle({ toggleSidebar, t }: MobileNavToggleProps) {
  // pocket patch: drawer-toggle a11y — subscribe to the frame's
  // data-sidebar-collapsed (documentElement-level MutationObserver with
  // attributeFilter) and render aria-expanded, switching aria-label/title
  // between t('open')/t('close'). Same truth source as the drawer state in
  // platform/frame.ts: missing data-sidebar-collapsed attribute = open.
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => {
    const readOpen = (): boolean => {
      const frame = getFrame()
      return frame !== null && !frame.hasAttribute('data-sidebar-collapsed')
    }
    setDrawerOpen(readOpen())
    // Every streamed token is a text childList mutation — a pure-text batch
    // cannot change drawer state, skip it; every other batch is coalesced by
    // rAF into at most one readOpen (two querySelectors) per frame.
    // attributeFilter only narrows attribute records; childList records still
    // reach the callback, so the two exemptions above are required, not an
    // optimization.
    let raf = 0
    const schedule = (): void => {
      if (raf !== 0) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setDrawerOpen(readOpen())
      })
    }
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') {
          if (record.attributeName === 'data-sidebar-collapsed') {
            schedule()
            return
          }
          continue
        }
        const nodes = [...record.addedNodes, ...record.removedNodes]
        if (nodes.length === 0 || !nodes.every((node) => node.nodeType === Node.TEXT_NODE)) {
          schedule()
          return
        }
      }
    })
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-sidebar-collapsed'],
    })
    return () => {
      if (raf !== 0) cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])
  const toggleExplorer = (): void => {
    openFilesPanel()
  }
  return (
    <>
      <button
        type="button"
        data-mobile-nav="toggle"
        aria-label={drawerOpen ? t('close') : t('open')}
        aria-expanded={drawerOpen}
        title={drawerOpen ? t('close') : t('open')}
        onClick={() => toggleSidebar()}
      >
        <IconPanelLeft size={16} />
      </button>
      <button
        type="button"
        data-mobile-nav="files"
        aria-label={t('files')}
        title={t('files')}
        onClick={toggleExplorer}
      >
        <IconFolderOpen size={16} />
      </button>
    </>
  )
}
