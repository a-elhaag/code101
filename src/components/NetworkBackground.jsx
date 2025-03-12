"use client";
import React, { useEffect, useRef } from "react";

export default function NetworkBackground({ color = "#007bff", density = 10, speed = 1 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Node and connection properties
        const nodeCount = Math.floor((width * height) / (30000 / density));
        const connectionDistance = Math.min(width, height) / 6;
        const nodes = [];

        // Initialize nodes
        class Node {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.radius = Math.random() * 1.5 + 1;
            }

            // Update position with boundary checking
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            // Draw the node
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create initial nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }

        // Draw connections between nodes
        function drawConnections() {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Create gradient opacity based on distance
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `${color}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = opacity * 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Set node color
            ctx.fillStyle = `${color}80`;

            // Update and draw each node
            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            // Draw connections
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        }

        // Handle window resize
        function handleResize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", handleResize);
        animate();

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, density, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="network-background"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                opacity: 0.6,
            }}
            aria-hidden="true"
        />
    );
}
