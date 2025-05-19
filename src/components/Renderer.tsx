import { useEffect, useState, type JSX } from 'react'
import { Box, Divider, Link, Tooltip, Typography } from '@mui/material'
import { keyframes } from '@emotion/react'
import * as mfm from 'mfm-js'
import { Sparkle } from './Sparkle'
import { Search } from "./Search"

export interface Emoji {
    imageURL: string
}

export interface RenderAstProps {
    ast: any
    emojis: Record<string, Emoji>
    options?: {
        getImageURL?: (url?: string, params?: { maxWidth?: number; maxHeight?: number; format?: string }) => string
        components?: Record<string, (ast: any) => JSX.Element>
    }
}

export interface MfmRendererProps {
    body: string
    emojis: Record<string, Emoji>
    options?: {
        getImageURL?: (url?: string, params?: { maxWidth?: number; maxHeight?: number; format?: string }) => string
        onUpdate?: () => void
        components?: Record<string, (ast: any) => JSX.Element>
    }
}

export const RenderAst = ({ ast, emojis, options }: RenderAstProps): JSX.Element => {

    if (Array.isArray(ast)) {
        return (
            <>
                {ast.map((node: any, i: number) => (
                    <RenderAst key={i} ast={node} emojis={emojis} options={options} />
                ))}
            </>
        )
    }

    if (!ast) {
        return <>null</>
    }

    if ((options?.components) && (ast.type in options.components)) {
        return <>{options.components[ast.type](ast)}</>
    }

    switch (ast.type) {
        case 'text': {
            return <span>{ast.props.text}</span>
        }
        case 'bold': {
            return (
                <b>
                    <RenderAst ast={ast.children} emojis={emojis} />
                </b>
            )
        }
        case 'strike': {
            return (
                <s>
                    <RenderAst ast={ast.children} emojis={emojis} />
                </s>
            )
        }
        case 'italic': {
            return (
                <i>
                    <RenderAst ast={ast.children} emojis={emojis} />
                </i>
            )
        }
        case 'fn': {
            switch (ast.props.name) {
                case 'tada': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmGlobalTada} ${speed} linear infinite both`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'jelly': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmRubberBand} ${speed} linear infinite both`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'twitch': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmTwitch} ${speed} linear infinite both`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'shake': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmShake} ${speed} ease infinite`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'spin': {
                    const direction = ast.props.args.left
                        ? 'reverse'
                        : ast.props.args.alternate
                          ? 'alternate'
                          : 'normal'
                    const speed = ast.props.args.speed ?? '1.5s'
                    const delay = ast.props.args.delay ?? '0s'
                    const anime = ast.props.args.x ? mfmSpinX : ast.props.args.y ? mfmSpinY : mfmSpin
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${anime} ${speed} linear infinite`,
                                animationDirection: direction,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'jump': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmJump} ${speed} linear infinite`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'bounce': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmBounce} ${speed} linear infinite`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'flip': {
                    const transform =
                        ast.props.args.h && ast.props.args.v
                            ? 'scale(-1, -1)'
                            : ast.props.args.v
                              ? 'scaleY(-1)'
                              : 'scaleX(-1)'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                transform: transform
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'x2': {
                    return (
                        <span style={{ fontSize: '200%' }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'x3': {
                    return (
                        <span style={{ fontSize: '400%' }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'x4': {
                    return (
                        <span style={{ fontSize: '600%' }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'font': {
                    const family = ast.props.args.serif
                        ? 'serif'
                        : ast.props.args.monospace
                          ? 'monospace'
                          : ast.props.args.cursive
                            ? 'cursive'
                            : ast.props.args.fantasy
                              ? 'fantasy'
                              : ast.props.args.emoji
                                ? 'emoji'
                                : ast.props.args.math
                                  ? 'math'
                                  : null
                    if (family) {
                        return (
                            <span
                                style={{
                                    fontFamily: family,
                                    display: 'inline-block'
                                }}
                            >
                                <RenderAst ast={ast.children} emojis={emojis} />
                            </span>
                        )
                    }
                    return (
                        <span
                            style={{
                                display: 'inline-block'
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'blur': {
                    return <Box
                        sx={{
                            display: 'inline-block',
                            filter: 'blur(6px)',
                            transition: 'filter 0.3s',
                            '&:hover': {
                                filter: 'blur(0px)'
                            }
                        }}
                    >
                        <RenderAst ast={ast.children} emojis={emojis} />
                    </Box>
                }
                case 'rainbow': {
                    const speed = ast.props.args.speed ?? '1s'
                    const delay = ast.props.args.delay ?? '0s'
                    return (
                        <Box
                            sx={{
                                display: 'inline-block',
                                animation: `${mfmRainbow} ${speed} linear infinite`,
                                animationDelay: delay
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
                case 'sparkle': {
                    return <Sparkle>
                        <RenderAst ast={ast.children} emojis={emojis} />
                    </Sparkle>
                }
                case 'rotate': {
                    const degrees = ast.props.args.deg ?? 90
                    return (
                        <span
                            style={{
                                display: 'inline-block',
                                transform: `rotate(${degrees}deg)`,
                                transformOrigin: 'center center'
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'position': {
                    return (
                        <span
                            style={{
                                display: 'inline-block',
                                transform: `translateX(${ast.props.args.x ?? 0}em) translateY(${ast.props.args.y ?? 0}em)`
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'scale': {
                    const x = Math.min(ast.props.args.x ?? 1, 5)
                    const y = Math.min(ast.props.args.y ?? 1, 5)
                    return (
                        <span style={{ display: 'inline-block', transform: `scale(${x}, ${y})` }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'fg': {
                    let color = ast.props.args.color ?? 'f00'
                    if (color[0] !== '#') {
                        color = color.replace(/([0-9a-f]{3,6})/g, '#$1')
                    }
                    return (
                        <span style={{ display: 'inline-block', color: `${color}` }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'bg': {
                    let color = ast.props.args.color ?? 'f00'
                    if (color[0] !== '#') {
                        color = color.replace(/([0-9a-f]{3,6})/g, '#$1')
                    }
                    return (
                        <span style={{ display: 'inline-block', backgroundColor: `${color}` }}>
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </span>
                    )
                }
                case 'border': {
                    let color = ast.props.args.color ?? 'ddd'
                    if (color[0] !== '#') {
                        color = color.replace(/([0-9a-f]{3,6})/g, '#$1')
                    }
                    const style = ast.props.args.style ?? 'solid'
                    const width = ast.props.args.width ?? 1
                    const radius = ast.props.args.radius ?? 0
                    const overflow = ast.props.args.noclip ? 'unset' : 'clip'
                    return (
                        <Box
                            sx={{
                                border: `${width}px ${style} ${color}`,
                                borderRadius: `${radius}px`,
                                display: 'inline-block',
                                padding: '0.5em',
                                overflow: overflow
                            }}
                        >
                            <RenderAst ast={ast.children} emojis={emojis} />
                        </Box>
                    )
                }
            }
            return <>unknown fn: {ast.props.name}</>
        }
        case 'small': {
            return (
                <span style={{ fontSize: '80%', opacity: 0.7 }}>
                    <RenderAst ast={ast.children} emojis={emojis} />
                </span>
            )
        }
        case 'center': {
            return (
                <Box
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <RenderAst ast={ast.children} emojis={emojis} />
                </Box>
            )
        }
        case 'url': {
            return (
                <Link component="a" href={ast.props.url} target="_blank" rel="noopener noreferrer" color="secondary" underline="hover">
                    {ast.props.url}
                </Link>
            )
        }
        case 'link': {
            return (
                <Link component="a" href={ast.props.url} target="_blank" rel="noopener noreferrer" color="secondary" underline="hover">
                    <RenderAst ast={ast.children} emojis={emojis} />
                </Link>
            )
        }
        case 'blockCode': {
            return <pre>{ast.props.code}</pre>
        }
        case 'inlineCode': {
            return <code>{ast.props.code}</code>
        }
        case 'quote': {
            return (
                <Box
                    sx={{
                        borderLeft: '4px solid #ccc',
                        paddingLeft: '1em',
                        marginBottom: '1em'
                    }}
                >
                    <RenderAst ast={ast.children} emojis={emojis} />
                </Box>
            )
        }
        case 'emojiCode': {
            const emoji = emojis[ast.props.name]
            return emoji ? (
                <Tooltip
                    arrow
                    placement="top"
                    title={
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <img
                                src={

                            options?.getImageURL?.(emoji.imageURL, { maxHeight: 128 }) ?? emoji.imageURL
                                }
                                style={{
                                    height: '5em'
                                }}
                            />
                            <Divider />
                            <Typography variant="caption" align="center">
                                {ast.props.name}
                            </Typography>
                        </Box>
                    }
                >
                    <img
                        src={
                            options?.getImageURL?.(emoji.imageURL, { maxHeight: 128 }) ?? emoji.imageURL
                        }
                        style={{
                            height: '2em',
                            verticalAlign: 'middle'
                        }}
                    />
                </Tooltip>
            ) : (
                <span>:{ast.props.name}:</span>
            )
        }
        case 'unicodeEmoji': {
            return <span>{ast.props.emoji}</span>
        }
        case 'search': {
            return <Search query={ast.props.query} />
        }
    }

    return <>unknown ast type: {ast.type}</>
}

export const MfmRenderer = (props: MfmRendererProps): JSX.Element => {
    const [ast, setAst] = useState<any>(null)

    useEffect(() => {
        if (props.body === '') {
            setAst([])
            return
        }
        try {
            setAst(mfm.parse(props.body))
        } catch (e) {
            console.error(e)
            setAst([
                {
                    type: 'Text',
                    body: props.body
                },
                {
                    type: 'Text',
                    body: 'error: ' + JSON.stringify(e)
                }
            ])
        }
    }, [props.body])

    useEffect(() => {
        props.options?.onUpdate?.()
    }, [ast])

    return (
        <Box
            sx={{
                whiteSpace: 'pre-wrap'
            }}
        >
            <RenderAst ast={ast} emojis={props.emojis} />
        </Box>
    )
}

const mfmSpinX = keyframes`
	0% { transform: perspective(128px) rotateX(0deg); }
	100% { transform: perspective(128px) rotateX(360deg); }
`

const mfmSpinY = keyframes`
	0% { transform: perspective(128px) rotateY(0deg); }
	100% { transform: perspective(128px) rotateY(360deg); }
`

const mfmSpin = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`

const mfmRubberBand = keyframes`
	from { transform: scale3d(1, 1, 1); }
	30% { transform: scale3d(1.25, 0.75, 1); }
	40% { transform: scale3d(0.75, 1.25, 1); }
	50% { transform: scale3d(1.15, 0.85, 1); }
	65% { transform: scale3d(0.95, 1.05, 1); }
	75% { transform: scale3d(1.05, 0.95, 1); }
	to { transform: scale3d(1, 1, 1); }
`

const mfmGlobalTada = keyframes`
	from {
		transform: scale3d(1, 1, 1);
	}

	10%,
	20% {
		transform: scale3d(0.91, 0.91, 0.91) rotate3d(0, 0, 1, -2deg);
	}

	30%,
	70% {
		transform: scale3d(1.09, 1.09, 1.09) rotate3d(0, 0, 1, 2deg);
	}

	50%,
	90% {
		transform: scale3d(1.09, 1.09, 1.09) rotate3d(0, 0, 1, -2deg);
	}

	to {
		transform: scale3d(1, 1, 1);
	}
`

const mfmTwitch = keyframes`
	0% { transform: translate(7px, -2px) }
	5% { transform: translate(-3px, 1px) }
	10% { transform: translate(-7px, -1px) }
	15% { transform: translate(0px, -1px) }
	20% { transform: translate(-8px, 6px) }
	25% { transform: translate(-4px, -3px) }
	30% { transform: translate(-4px, -6px) }
	35% { transform: translate(-8px, -8px) }
	40% { transform: translate(4px, 6px) }
	45% { transform: translate(-3px, 1px) }
	50% { transform: translate(2px, -10px) }
	55% { transform: translate(-7px, 0px) }
	60% { transform: translate(-2px, 4px) }
	65% { transform: translate(3px, -8px) }
	70% { transform: translate(6px, 7px) }
	75% { transform: translate(-7px, -2px) }
	80% { transform: translate(-7px, -8px) }
	85% { transform: translate(9px, 3px) }
	90% { transform: translate(-3px, -2px) }
	95% { transform: translate(-10px, 2px) }
	100% { transform: translate(-2px, -6px) }
`

const mfmShake = keyframes`
	0% { transform: translate(-3px, -1px) rotate(-8deg) }
	5% { transform: translate(0px, -1px) rotate(-10deg) }
	10% { transform: translate(1px, -3px) rotate(0deg) }
	15% { transform: translate(1px, 1px) rotate(11deg) }
	20% { transform: translate(-2px, 1px) rotate(1deg) }
	25% { transform: translate(-1px, -2px) rotate(-2deg) }
	30% { transform: translate(-1px, 2px) rotate(-3deg) }
	35% { transform: translate(2px, 1px) rotate(6deg) }
	40% { transform: translate(-2px, -3px) rotate(-9deg) }
	45% { transform: translate(0px, -1px) rotate(-12deg) }
	50% { transform: translate(1px, 2px) rotate(10deg) }
	55% { transform: translate(0px, -3px) rotate(8deg) }
	60% { transform: translate(1px, -1px) rotate(8deg) }
	65% { transform: translate(0px, -1px) rotate(-7deg) }
	70% { transform: translate(-1px, -3px) rotate(6deg) }
	75% { transform: translate(0px, -2px) rotate(4deg) }
	80% { transform: translate(-2px, -1px) rotate(3deg) }
	85% { transform: translate(1px, -3px) rotate(-10deg) }
	90% { transform: translate(1px, 0px) rotate(3deg) }
	95% { transform: translate(-2px, 0px) rotate(-3deg) }
	100% { transform: translate(2px, 1px) rotate(2deg) }
`

const mfmJump = keyframes`
	0% { transform: translateY(0); }
	25% { transform: translateY(-16px); }
	50% { transform: translateY(0); }
	75% { transform: translateY(-8px); }
	100% { transform: translateY(0); }
`

const mfmBounce = keyframes`
	0% { transform: translateY(0) scale(1, 1); }
	25% { transform: translateY(-16px) scale(1, 1); }
	50% { transform: translateY(0) scale(1, 1); }
	75% { transform: translateY(0) scale(1.5, 0.75); }
	100% { transform: translateY(0) scale(1, 1); }
`

const mfmRainbow = keyframes`
	0% { filter: hue-rotate(0deg) contrast(150%) saturate(150%); }
	100% { filter: hue-rotate(360deg) contrast(150%) saturate(150%); }
`


