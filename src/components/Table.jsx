"use client";
import React, { useState, useRef, useEffect } from "react";

const Table = () => {
    // Track which row is being hovered and mouse position
    const [hoveredRow, setHoveredRow] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const tableRef = useRef(null);
    const rowRefs = useRef([]);

    // Initialize row refs
    useEffect(() => {
        rowRefs.current = rowRefs.current.slice(0, tableData.length);
    }, []);

    const tableData = [
        {
            key: "learn",
            title: "Learn",
            description: "Master coding fundamentals through interactive tutorials and hands-on exercises designed for all skill levels."
        },
        {
            key: "build",
            title: "Build",
            description: "Create real-world projects that solve problems and demonstrate your growing technical capabilities."
        },
        {
            key: "share",
            title: "Share",
            description: "Contribute to our community, showcase your work, and get feedback from fellow developers."
        }
    ];

    // Handle mouse movement to create dynamic highlight effect
    const handleMouseMove = (e, rowKey) => {
        if (hoveredRow === rowKey) {
            const rowElement = rowRefs.current[tableData.findIndex(row => row.key === rowKey)];
            if (rowElement) {
                const rect = rowElement.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePos({ x, y });
            }
        }
    };

    return (
        <div className="table-container">
            <div
                className="table-wrapper"
                ref={tableRef}
            >
                <table className="slogan-table">
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr
                                key={row.key}
                                ref={el => rowRefs.current[index] = el}
                                onMouseEnter={() => setHoveredRow(row.key)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onMouseMove={(e) => handleMouseMove(e, row.key)}
                                className={`row-animate ${hoveredRow === row.key ? "hovered" : ""}`}
                                style={{
                                    "--delay": `${index * 0.1}s`,
                                    "--mouse-x": `${mousePos.x}px`,
                                    "--mouse-y": `${mousePos.y}px`
                                }}
                            >
                                <td className="title-cell">
                                    <span className="title-text">{row.title}</span>
                                </td>
                                <td className="desc-cell">
                                    <div className="desc-content">{row.description}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .table-container {
          padding: 2rem;
          width: 100%;
          max-width: 100%;
          display: flex;
          justify-content: center;
        }

        .table-wrapper {
          width: 100%;
          max-width: 900px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          position: relative;
        }

        .slogan-table {
          width: 100%;
          border-collapse: collapse;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
        }

        .slogan-table tr {
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .slogan-table tr:last-child {
          border-bottom: none;
        }

        .row-animate {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeIn 0.6s forwards;
          animation-delay: var(--delay);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slogan-table tr.hovered {
          background: radial-gradient(
            circle 80px at var(--mouse-x) var(--mouse-y),
            var(--color-blue) 0%,
            rgba(0, 120, 255, 0.4) 40%,
            transparent 80%
          );
          box-shadow: 0 0 30px rgba(0, 120, 255, 0.3) inset;
        }

        .slogan-table tr.hovered::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }

        .slogan-table td {
          padding: 1.8rem;
          color: var(--color-white);
          transition: all 0.3s ease;
        }

        .title-cell {
          font-family: var(--font-ibm-plex-mono);
          font-weight: 700;
          font-size: 1.5rem;
          width: 30%;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }

        .title-text {
          position: relative;
          display: inline-block;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .title-text::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        tr.hovered .title-text {
          transform: translateY(-2px);
          color: white;
        }

        tr.hovered .title-text::after {
          transform: scaleX(1);
        }

        .desc-cell {
          font-family: var(--font-roboto);
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .desc-content {
          opacity: 0.9;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        tr.hovered .desc-content {
          opacity: 1;
          transform: translateX(5px);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .table-container {
            padding: 1.5rem;
          }
          
          .title-cell {
            font-size: 1.2rem;
          }
          
          .desc-cell {
            font-size: 0.95rem;
          }
          
          .slogan-table td {
            padding: 1.2rem 1rem;
          }
        }

        /* Small screen layout */
        @media (max-width: 580px) {
          .table-container {
            padding: 1rem;
          }
          
          .slogan-table tr {
            display: flex;
            flex-direction: column;
            padding: 1rem;
          }
          
          .title-cell {
            width: 100%;
            border-bottom: none;
            padding-bottom: 0.5rem;
          }
          
          .desc-cell {
            padding-top: 0;
          }

          .row-animate {
            transform: translateX(-10px);
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }
      `}</style>
        </div>
    );
};

export default Table;