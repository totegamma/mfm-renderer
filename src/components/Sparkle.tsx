import { keyframes } from '@emotion/react'
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const particleAnimation = keyframes`
	0% {
		rotate: 0deg;
		scale: 0;
	}
	50% {
		scale: var(--size);
	}
	100% {
		rotate: 360deg;
		scale: 0;
	}
}`

export interface SparkleProps {
    children?: React.ReactNode;
}

export const Sparkle = (props: SparkleProps) => {

    const colors = ['#FF1493', '#00FFFF', '#FFE202', '#FFE202', '#FFE202'];
    const ref = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<{
        id: string,
        x: number,
        y: number,
        size: number,
        dur: number,
        color: string
    }[]>([])

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        let stop = false
        const ro = new ResizeObserver((_entries, _observer) => {
            if (ref.current == null) return
            setWidth(ref.current.offsetWidth + 64);
            setHeight(ref.current.offsetHeight + 64);
        })
        if (ref.current) ro.observe(ref.current)
        const add = () => {
            if (stop) return
            const x = (Math.random() * (width - 64));
            const y = (Math.random() * (height - 64));
            const sizeFactor = Math.random();
            const particle = {
                id: Math.random().toString(),
                x,
                y,
                size: 0.2 + ((sizeFactor / 10) * 3),
                dur: 1000 + (sizeFactor * 1000),
                color: colors[Math.floor(Math.random() * colors.length)],
            };
            setParticles(particles => [...particles, particle]);
            window.setTimeout(() => {
                setParticles(particles => particles.filter(x => x.id !== particle.id));
            }, particle.dur - 100);

            window.setTimeout(() => {
                add();
            }, 500 + (Math.random() * 500));
        }
        add()
        return () => {
            if (ro) ro.disconnect()
            stop = true
        }
    }, [width, height])

    return <Box
        component="span"
        sx={{
            position: 'relative',
            display: 'inline-block',
        }}
    >
        <Box 
            component="span"
            ref={ref}
            style={{display: 'inline-block'}}
        >
            {props.children}
        </Box>
        {particles.map((particle) => {
	        return <Box
                    component="svg"
                    key={particle.id}
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    sx={{
                        position: 'absolute',
                        top: '-32px',
                        left: '-32px',
                        pointerEvents: 'none'
                    }}
                >
                <Box
                    component="path"
                    sx={{
                        transformOrigin: 'center',
                        transformBox: 'fill-box',
                        translate: `${particle.x}px ${particle.y}px`,
                        animation: `${particleAnimation} ${particle.dur}ms linear infinite`,
                        '--size': particle.size,
                    }}
                    fill={particle.color}
                    d="M29.427,2.011C29.721,0.83 30.782,0 32,0C33.218,0 34.279,0.83 34.573,2.011L39.455,21.646C39.629,22.347 39.991,22.987 40.502,23.498C41.013,24.009 41.653,24.371 42.354,24.545L61.989,29.427C63.17,29.721 64,30.782 64,32C64,33.218 63.17,34.279 61.989,34.573L42.354,39.455C41.653,39.629 41.013,39.991 40.502,40.502C39.991,41.013 39.629,41.653 39.455,42.354L34.573,61.989C34.279,63.17 33.218,64 32,64C30.782,64 29.721,63.17 29.427,61.989L24.545,42.354C24.371,41.653 24.009,41.013 23.498,40.502C22.987,39.991 22.347,39.629 21.646,39.455L2.011,34.573C0.83,34.279 0,33.218 0,32C0,30.782 0.83,29.721 2.011,29.427L21.646,24.545C22.347,24.371 22.987,24.009 23.498,23.498C24.009,22.987 24.371,22.347 24.545,21.646L29.427,2.011Z"
                ></Box>
            </Box>
        })}
    </Box>

}

