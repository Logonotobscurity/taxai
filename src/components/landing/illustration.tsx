export function Illustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-lg"
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(163 100% 31%)", stopOpacity: 1 }} />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
      </defs>
      
      {/* Base shape */}
      <path d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="url(#grad1)" fillOpacity="0.1"/>
      
      {/* Main glowing shape */}
      <g filter="url(#glow)">
        <path d="M256,52c112.7,0,204,91.3,204,204S368.7,460,256,460S52,368.7,52,256S143.3,52,256,52 M256,32 C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32L256,32z" fill="hsl(var(--primary))" fillOpacity="0.4"/>
        <path d="M256,52c112.7,0,204,91.3,204,204S368.7,460,256,460S52,368.7,52,256S143.3,52,256,52 M256,32 C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32L256,32z" stroke="hsl(var(--primary-foreground))" strokeWidth="4"/>
      </g>
      
      {/* Inner Circles */}
      <circle cx="256" cy="256" r="160" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.5"/>
      <circle cx="256" cy="256" r="120" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3"/>
      
      {/* Central icon - Calculator */}
      <g transform="translate(192, 192) scale(0.5)">
        <rect x="128" y="128" width="256" height="256" rx="20" fill="hsl(var(--primary))" fillOpacity="0.3"/>
        <path d="M148,128h216c11,0,20,9,20,20v216c0,11-9,20-20,20H148c-11,0-20-9-20-20V148C128,137,137,128,148,128z" stroke="hsl(var(--primary-foreground))" strokeWidth="8"/>
        <rect x="152" y="152" width="208" height="64" rx="8" fill="hsl(var(--background))"/>
        <circle cx="180" cy="252" r="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="256" cy="252" r="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="332" cy="252" r="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="180" cy="316" r="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="256" cy="316" r="16" fill="hsl(var(--primary-foreground))" />
        <rect x="316" y="300" width="32" height="80" rx="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="180" cy="380" r="16" fill="hsl(var(--primary-foreground))" />
        <circle cx="256" cy="380" r="16" fill="hsl(var(--primary-foreground))" />
      </g>
      
      {/* Orbiting Elements */}
      <g>
          <circle cx="100" cy="150" r="12" fill="hsl(var(--accent))"/>
          <animateTransform attributeName="transform" type="rotate" from="0 256 256" to="360 256 256" dur="20s" repeatCount="indefinite"/>
      </g>
      <g>
          <rect x="380" y="350" width="24" height="24" rx="4" fill="hsl(var(--primary-foreground))"/>
          <animateTransform attributeName="transform" type="rotate" from="360 256 256" to="0 256 256" dur="25s" repeatCount="indefinite"/>
      </g>
    </svg>
  );
}
