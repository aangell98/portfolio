import { useCallback, useEffect, useState } from 'react'
import type { AnchorHTMLAttributes, MouseEvent } from 'react'

type Availability = 'unknown' | 'online' | 'offline'

interface SmartDemoLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  live?: string
  offline?: string
  probe?: string
  preferOffline?: boolean
}

async function probeNetwork(url: string, timeoutMs = 3500) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    })
    return true
  } catch {
    return false
  } finally {
    window.clearTimeout(timeout)
  }
}

function probeImage(url: string, timeoutMs = 3500) {
  return new Promise<boolean>(resolve => {
    const image = new Image()
    let settled = false
    const finish = (online: boolean) => {
      if (settled) return
      settled = true
      window.clearTimeout(timeout)
      image.onload = null
      image.onerror = null
      resolve(online)
    }
    const timeout = window.setTimeout(() => {
      image.src = ''
      finish(false)
    }, timeoutMs)
    image.onload = () => finish(true)
    image.onerror = () => finish(false)
    const separator = url.includes('?') ? '&' : '?'
    image.src = `${url}${separator}portfolio_probe=${Date.now()}`
  })
}

export default function SmartDemoLink({
  live,
  offline,
  probe,
  preferOffline = false,
  onClick,
  target = '_blank',
  rel = 'noreferrer',
  children,
  ...props
}: SmartDemoLinkProps) {
  const [availability, setAvailability] = useState<Availability>(
    preferOffline || !live ? 'offline' : 'unknown',
  )

  const resolveDestination = useCallback(async () => {
    if (preferOffline || !live) return offline ?? live
    if (!offline) return live
    if (availability === 'online') return live
    if (availability === 'offline') return offline

    const online = probe
      ? await probeImage(probe)
      : await probeNetwork(live)
    setAvailability(online ? 'online' : 'offline')
    return online ? live : offline
  }, [availability, live, offline, preferOffline, probe])

  useEffect(() => {
    if (preferOffline || !live || !offline) return
    let active = true
    const check = probe ? probeImage(probe) : probeNetwork(live)
    check.then(online => {
      if (active) setAvailability(online ? 'online' : 'offline')
    })
    return () => {
      active = false
    }
  }, [live, offline, preferOffline, probe])

  const href =
    preferOffline || !live
      ? offline ?? live
      : availability === 'offline'
        ? offline ?? live
        : live

  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || !live || !offline || preferOffline || availability !== 'unknown') {
      return
    }

    event.preventDefault()
    const popup = target === '_blank' ? window.open('about:blank', '_blank') : null
    if (popup) popup.opener = null
    const destination = await resolveDestination()
    if (!destination) return

    if (popup) popup.location.replace(destination)
    else window.location.assign(destination)
  }

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      data-live-status={availability}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
