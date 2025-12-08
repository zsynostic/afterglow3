"use client"

import { useEffect, useState } from "react"

export function LogWaterfall() {
  const [logs, setLogs] = useState<string[][]>([])

  useEffect(() => {
    // Generate 8 columns of logs
    const columns = 8
    const logsPerColumn = 20
    const errorTypes = [
      "ERROR_0x4F",
      "SYSTEM_HALT",
      "MEM_CORRUPT",
      "DATA_LOST",
      "SYNC_FAIL",
      "AUTH_DENIED",
      "LINK_BROKEN",
      "NULL_PTR",
      "OVERFLOW",
      "TIMEOUT",
      "FATAL_ERR",
      "ACCESS_DENY",
    ]

    const generateHex = () => {
      return "0x" + Math.random().toString(16).substring(2, 10).toUpperCase()
    }

    const generateLog = () => {
      const isError = Math.random() > 0.6
      return isError ? errorTypes[Math.floor(Math.random() * errorTypes.length)] : generateHex()
    }

    const initialLogs = Array(columns)
      .fill(null)
      .map(() =>
        Array(logsPerColumn)
          .fill(null)
          .map(() => generateLog()),
      )
    setLogs(initialLogs)

    // Update logs periodically
    const interval = setInterval(() => {
      setLogs((prev) =>
        prev.map((column) => {
          const newColumn = [...column]
          const updateIndex = Math.floor(Math.random() * logsPerColumn)
          newColumn[updateIndex] = generateLog()
          return newColumn
        }),
      )
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="log-waterfall">
      {logs.map((column, colIndex) => (
        <div
          key={colIndex}
          className="log-column"
          style={{
            animationDelay: `${colIndex * 0.5}s`,
            left: `${(colIndex / logs.length) * 100}%`,
          }}
        >
          {column.map((log, logIndex) => (
            <span
              key={logIndex}
              className={`log-entry ${log.includes("ERROR") || log.includes("HALT") || log.includes("FATAL") || log.includes("DENY") ? "log-error" : ""}`}
              style={{ animationDelay: `${logIndex * 0.1}s` }}
            >
              {log}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
