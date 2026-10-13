import { getFrame } from '../platform/frame.ts'
import type { ReconcilerTask } from '../core/reconciler-core.ts'

/**
 * dsh-file-viewer open marker. The plugin renders a
 * <section class="dsfv-panel" data-conversation-composer-overlay> as a
 * conversation.view tab next to "对话"/"轨迹" (its own idempotent <style>
 * uses the stable `dsfv-` prefix — no CSS Modules). Detection keys on the
 * panel's own `.dsfv-panel` class, NOT on `data-conversation-composer-overlay`:
 * that attribute is the host conversation.view system's generic overlay flag
 * shared by every view tab (the built-in trajectory tab sets it too), so it
 * would false-positive the marker whenever any overlay is open. The marker
 * only reflects the file-viewer panel existing and serves the compat.css
 * mobile layout rules. Gesture takeover is a separate signal —
 * sidebar-swipe.ts reads the generic overlay attribute directly.
 * Idempotent like the other frame markers; dispose clears it when the tab
 * unmounts or on deactivation.
 * Scoped to the mobile branch because the reconciler only runs when the
 * mobile breakpoint is active (registerReconcileTasks installs it there).
 * (Port of community fork fix 2ff7976, re-scoped per design
 * 2026-09-06-conversation-overlay-takeover-design.md §4.1.)
 */
export function createFileViewerMarkerTask(): ReconcilerTask {
  /** Last observed panel presence + frame. This '*' task wakes on every
   * mutation batch and the file-viewer tab is closed the overwhelming
   * majority of the time; without the memo, each flush re-ran the
   * set/remove attribute pair for no state change. */
  let wasActive: boolean | null = null
  let lastFrame: HTMLElement | null = null
  return {
    name: 'file-viewer-open-marker',
    scopes: ['*'],
    ensure: () => {
      const frame = getFrame()
      if (frame === null) return
      const active = document.querySelector('.dsfv-panel') !== null
      // No presence change on the same frame: the marker already holds the
      // right value — this task is its only writer while active. The frame
      // identity check covers a shell rebuild: a NEW frame element must be
      // re-marked even when the panel state carried over.
      if (active === wasActive && frame === lastFrame) return
      wasActive = active
      lastFrame = frame
      if (active) {
        frame.setAttribute('data-file-viewer-open', '')
      } else {
        frame.removeAttribute('data-file-viewer-open')
      }
    },
    dispose: () => {
      wasActive = null
      lastFrame = null
      getFrame()?.removeAttribute('data-file-viewer-open')
    },
  }
}
