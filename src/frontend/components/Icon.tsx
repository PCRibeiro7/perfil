import { SVGProps } from 'react';

const paths: Record<string, JSX.Element> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    back: <path d="M19 12H5m6-6-6 6 6 6" />,
    sparkles: (
        <>
            <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
            <path d="m20 2 .5 1.5L22 4l-1.5.5L20 6l-.5-1.5L18 4l1.5-.5L20 2Z" />
        </>
    ),
    bulb: (
        <>
            <path d="M9 18h6m-5 3h4M8.5 14.5a6 6 0 1 1 7 0c-1 .7-1.5 1.5-1.5 3.5h-4c0-2-.5-2.8-1.5-3.5Z" />
            <path d="m10 9 2 2 2-2m-2 2v6" />
        </>
    ),
    trophy: (
        <path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm4 10v6m-4 2h8M8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4" />
    ),
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </>
    ),
    grid: (
        <>
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
        </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    volume: (
        <path d="m11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
    ),
    muted: <path d="m11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m-6 0 6-6" />,
    reset: (
        <>
            <path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    left: <path d="m15 6-6 6 6 6" />,
    right: <path d="m9 6 6 6-6 6" />,
    chart: <path d="M4 20h17M7 16v-5m5 5V4m5 12V8" />,
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <path d="M3 12h18" />
        </>
    ),
    cube: <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Zm0 9 9-4m-9 4L3 8m9 4v9" />,
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2" />
        </>
    ),
    skip: <path d="m5 5 10 7-10 7V5Zm14 0v14" />,
};

export default function Icon({
    name,
    ...props
}: SVGProps<SVGSVGElement> & { name: string }) {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            {paths[name] || paths.sparkles}
        </svg>
    );
}
