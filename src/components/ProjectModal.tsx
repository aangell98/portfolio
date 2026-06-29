import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'
import type { ProjectItem } from '../data/content'
import { TechIcon, asset } from './ui/Icons'

function GithubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export default function ProjectModal({ project, onClose }: { project: ProjectItem | null; onClose: () => void }) {
  const { t } = useI18n()

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-panel/95 sm:rounded-3xl"
          >
            {/* header */}
            <div
              className="relative overflow-hidden border-b border-white/8 p-6 sm:p-8"
              style={{ background: `linear-gradient(135deg, ${project.accent}1f, transparent 70%)` }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink/40 text-xl text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center gap-4">
                {project.logo ? (
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/5 p-2">
                    <img src={asset(project.logo)} alt={project.name} className="h-full w-full object-contain" />
                  </span>
                ) : project.icon ? (
                  <TechIcon name={project.icon} size={30} />
                ) : null}
                <div>
                  <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                  {project.metrics && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.metrics.map((m) => (
                        <span key={m} className="rounded-md px-2 py-0.5 font-mono text-[11px] font-medium" style={{ background: `${project.accent}1f`, color: project.accent }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* body */}
            <div className="space-y-7 p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-mist/85">{project.longBlurb ?? project.blurb}</p>

              {project.features && (
                <div>
                  <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan/80">{t.work.featuresLabel}</h4>
                  <ul className="grid gap-2.5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.highlights && (
                <div>
                  <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan/80">{t.work.highlightsLabel}</h4>
                  <ul className="grid gap-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist/80">
                        <span className="mt-0.5 shrink-0 text-cyan">&#9656;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan/80">{t.work.techLabel}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tg) => (
                    <span key={tg} className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-mist/80">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* footer actions */}
            <div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-white/8 bg-panel/95 p-5 sm:p-6">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-brand px-6 py-3 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_24px_rgba(70,199,224,0.45)]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ink/80" />
                  </span>
                  {t.work.liveDemo}
                </a>
              )}
              {project.repos.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  <GithubMark />
                  {project.repos.length > 1 ? `${t.work.viewCode} · ${r.label}` : t.work.viewCode}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
