/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	container: {
  		center: true,
  		padding: '8px',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: {
  				DEFAULT: 'rgba(255, 255, 255, 0.13)',
  				secondary: 'rgba(255, 255, 255, 0.14)',
  				tertiary: 'rgba(255, 255, 255, 0.19)'
  			},
  			input: 'rgba(0, 0, 0, 0.15)',
  			ring: '#007DF0',
  			background: {
  				DEFAULT: '#1E1E1E',
  				secondary: '#2E2E2E',
  				tertiary: '#383838',
  				quaternary: '#373737',
  				quinary: '#444444',
  				inactive: '#2E2E2E',
  				inverse: '#EBEBEB'
  			},
  			foreground: {
  				DEFAULT: '#F5F5F5',
  				secondary: '#BDBDBD',
  				tertiary: '#A3A3A3',
  				inactive: '#757575',
  				inverse: '#1E1E1E'
  			},
  			primary: {
  				DEFAULT: '#006ACC',
  				foreground: '#FFFFFF',
  				hover: '#187CD9'
  			},
  			secondary: {
  				DEFAULT: 'rgba(255, 255, 255, 0.12)',
  				foreground: '#E0E0E0',
  				hover: 'rgba(255, 255, 255, 0.18)'
  			},
  			blue: {
  				DEFAULT: '#006ACC',
  				text: '#8AC2FF',
  				icon: '#8AC2FF',
  				border: '#007DF0'
  			},
  			green: {
  				DEFAULT: '#007A41',
  				hover: '#0D8A4F',
  				text: '#63D489',
  				icon: '#63D489',
  				border: '#259D4D'
  			},
  			yellow: {
  				DEFAULT: '#946B00',
  				hover: '#AF7F00',
  				text: '#F3C831',
  				icon: '#F3C831',
  				border: '#D7A220'
  			},
  			red: {
  				DEFAULT: '#CF313B',
  				hover: '#e63939',
  				text: '#FF8A8A',
  				icon: '#FF8A8A',
  				border: '#E42F3A'
  			},
  			orange: {
  				DEFAULT: '#BF4704',
  				hover: '#DC5616',
  				text: '#EBA267',
  				icon: '#EBA267',
  				border: '#DF640C'
  			},
  			purple: {
  				DEFAULT: '#734CE0',
  				hover: '#815BEB',
  				text: '#B89EFF',
  				icon: '#B89EFF',
  				border: '#875FFD'
  			},
  			destructive: {
  				DEFAULT: '#CF313B',
  				foreground: '#FF8A8A',
  				hover: '#CB3535',
  				border: '#E42F3A'
  			},
  			muted: {
  				DEFAULT: '#2E2E2E',
  				foreground: '#757575'
  			},
  			accent: {
  				DEFAULT: 'rgba(255, 255, 255, 0.12)',
  				foreground: '#E0E0E0'
  			},
  			popover: {
  				DEFAULT: '#2E2E2E',
  				foreground: '#F5F5F5'
  			},
  			card: {
  				DEFAULT: '#2E2E2E',
  				foreground: '#F5F5F5'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: '4px',
  			md: '4px',
  			sm: '4px'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			mono: [
  				'Roboto Mono',
  				'monospace'
  			]
  		},
  		fontSize: {
  			xs: '12.5px',
  			sm: '12.5px',
  			base: '12.5px',
  			lg: '12.5px'
  		},
  		fontWeight: {
  			normal: '400',
  			medium: '600'
  		},
  		letterSpacing: {
  			tight: '-0.115px'
  		},
  		boxShadow: {
  			'action-colored': '0px 0.5px 1px 0px rgba(0, 0, 0, 0.8), 0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.20) inset',
  			'action-secondary': '0px 0.5px 1px rgba(0, 0, 0, 0.8), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.12)',
  			'input-inner': '0px 1px 1px -1px rgba(0, 0, 0, 0.13) inset, 0px 3px 3px -3px rgba(0, 0, 0, 0.17) inset, 0px 4px 4px -4px rgba(0, 0, 0, 0.17) inset, 0px 8px 8px -8px rgba(0, 0, 0, 0.17) inset, 0px 12px 12px -12px rgba(0, 0, 0, 0.13) inset, 0px 16px 16px -16px rgba(0, 0, 0, 0.13) inset',
  			menu: '0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset, 0px 12px 24px 8px rgba(0, 0, 0, 0.04), 0px 8px 16px 4px rgba(0, 0, 0, 0.04), 0px 4px 8px 2px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 0px 1px 0px rgba(0, 0, 0, 0.25)'
  		},
  		spacing: {
  			'4': '4px',
  			'8': '8px',
  			'12': '12px',
  			'16': '16px',
  			'20': '20px',
  			'24': '24px',
  			'32': '32px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
