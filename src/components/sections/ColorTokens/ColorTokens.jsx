import React, { useState, useMemo } from 'react';
import { Palette, HelpCircle, Book, Link as LinkIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { theme } from '../../../theme';
import Card from '../../ui/Card/Card';

// --- Reusable Components & Styles ---
const PresentationCard = ({ children, ...props }) => (
    <Card {...props} style={{
        padding: theme.spacing.xl,
        border: `1px solid ${theme.colors.border.light}`,
        backgroundColor: theme.colors.background.primary,
        ...props.style
    }}>
        {children}
    </Card>
);

const SlideTitle = ({ children }) => (
    <h2 style={{
        fontSize: theme.typography.fontSize['3xl'],
        fontWeight: theme.typography.fontWeight.bold,
        marginBottom: theme.spacing.xl,
        borderBottom: `2px solid ${theme.colors.border.medium}`,
        paddingBottom: theme.spacing.md,
        textAlign: 'center'
    }}>
        {children}
    </h2>
);


// --- Individual Slide Components ---

const IntroSlide = () => (
    <PresentationCard>
        <SlideTitle>Mastercard Adaptive Design Ecosystem (MADE)</SlideTitle>
        <div style={{ textAlign: 'center', padding: `${theme.spacing['3xl']} 0` }}>
            <p style={{ fontSize: theme.typography.fontSize.xl, lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                Welcome! This presentation will walk you through key concepts of the <b>MADE</b> design system, from our foundational color tokens to our CSS architecture.
            </p>
            <p style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, marginTop: theme.spacing.lg }}>
                Click "Next" to begin.
            </p>
        </div>
    </PresentationCard>
);

const ColorMatcherSlide = () => {
    const [pickedColor, setPickedColor] = useState('#cf4500');

    const colorTokens = [
        { name: '--made-color-visualization-03', hex: '#cf008a', usage: 'Data Visualization Color' },
        { name: '--made-color-visualization-02', hex: '#ac00cf', usage: 'Data Visualization Color' },
        { name: '--made-color-visualization-01', hex: '#0023cf', usage: 'Data Visualization Color' },
        { name: '--made-color-text-default-on-dark', hex: '#ffffff', usage: 'Color of body text on dark background.' },
        { name: '--made-color-feedback-success', hex: '#038a00', usage: 'Color for success or positive state' },
        { name: '--made-color-feedback-error', hex: '#ee0000', usage: 'Color for error state' },
        { name: '--made-color-red-error-07', hex: '#330505', usage: 'Red error 7' },
        { name: '--made-color-red-error-06', hex: '#710808', usage: 'Red error 6' },
        { name: '--made-color-red-error-05', hex: '#b00606', usage: 'Red error 5' },
        { name: '--made-color-red-error-04', hex: '#ee0000', usage: 'Red error 4' },
        { name: '--made-color-red-error-03', hex: '#ff5656', usage: 'Red error 3' },
        { name: '--made-color-red-error-02', hex: '#ff9898', usage: 'Red error 2' },
        { name: '--made-color-red-error-01', hex: '#fadede', usage: 'Error Red 1' },
        { name: '--made-color-green-success-07', hex: '#042604', usage: 'Success Green 7' },
        { name: '--made-color-green-success-06', hex: '#0b560a', usage: 'Success Green 6' },
        { name: '--made-color-green-success-05', hex: '#097007', usage: 'Success Green 5' },
        { name: '--made-color-green-success-04', hex: '#038a00', usage: 'Success Green 4' },
        { name: '--made-color-green-success-03', hex: '#35b132', usage: 'Success Green 3' },
        { name: '--made-color-green-success-02', hex: '#7cd87a', usage: 'Success Green 2' },
        { name: '--made-color-green-success-01', hex: '#dff7df', usage: 'Success Green 1' },
        { name: '--made-color-yellow-07', hex: '#332805', usage: 'Yellow color 7' },
        { name: '--made-color-yellow-06', hex: '#664f0c', usage: 'Yellow color 6' },
        { name: '--made-color-yellow-05', hex: '#b28c16', usage: 'Yellow color 5' },
        { name: '--made-color-yellow-04', hex: '#ffc61e', usage: 'Yellow color 4' },
        { name: '--made-color-yellow-03', hex: '#ffd863', usage: 'Yellow color 3' },
        { name: '--made-color-yellow-02', hex: '#ffe8a5', usage: 'Yellow color 2' },
        { name: '--made-color-yellow-01', hex: '#fff4d1', usage: 'Yellow color 1' },
        { name: '--made-color-white', hex: '#ffffff', usage: 'White' },
        { name: '--made-color-teal-07', hex: '#1d2d27', usage: 'Teal color 7' },
        { name: '--made-color-teal-06', hex: '#23473d', usage: 'Teal color 6' },
        { name: '--made-color-teal-05', hex: '#266555', usage: 'Teal color 5' },
        { name: '--made-color-teal-04', hex: '#25836d', usage: 'Teal color 4' },
        { name: '--made-color-teal-03', hex: '#4bab94', usage: 'Teal color 3' },
        { name: '--made-color-teal-02', hex: '#88d3bf', usage: 'Teal color 2' },
        { name: '--made-color-teal-01', hex: '#dcf5ef', usage: 'Teal color 1' },
        { name: '--made-color-red-07', hex: '#541113', usage: 'Red color 7' },
        { name: '--made-color-red-06', hex: '#7e191c', usage: 'Red color 6' },
        { name: '--made-color-red-05', hex: '#a82226', usage: 'Red color 5' },
        { name: '--made-color-red-04', hex: '#d7373c', usage: 'Red color 4' },
        { name: '--made-color-red-03', hex: '#e66f65', usage: 'Red color 3' },
        { name: '--made-color-red-02', hex: '#f4a79f', usage: 'Red color 2' },
        { name: '--made-color-red-01', hex: '#f8ddde', usage: 'Red color 1' },
        { name: '--made-color-orange-07', hex: '#331505', usage: 'Orange color 7' },
        { name: '--made-color-orange-06', hex: '#662808', usage: 'Orange color 6' },
        { name: '--made-color-orange-05', hex: '#9a3a0a', usage: 'Orange color 5' },
        { name: '--made-color-orange-04', hex: '#cf4500', usage: 'Orange color 4' },
        { name: '--made-color-orange-03', hex: '#f37338', usage: 'Orange color 3' },
        { name: '--made-color-orange-02', hex: '#ffab82', usage: 'Orange color 2' },
        { name: '--made-color-orange-01', hex: '#ffe1d1', usage: 'Orange color 1' },
        { name: '--made-color-green-07', hex: '#1c2509', usage: 'Green color 7' },
        { name: '--made-color-green-06', hex: '#324113', usage: 'Green color 6' },
        { name: '--made-color-green-05', hex: '#496019', usage: 'Green color 5' },
        { name: '--made-color-green-04', hex: '#628020', usage: 'Green color 4' },
        { name: '--made-color-green-03', hex: '#87a740', usage: 'Green color 3' },
        { name: '--made-color-green-02', hex: '#b6cd7e', usage: 'Green color 2' },
        { name: '--made-color-green-01', hex: '#e8f1d5', usage: 'Green color 1' },
        { name: '--made-color-gray-07', hex: '#141413', usage: 'Canvas color - Gray 7' },
        { name: '--made-color-gray-06-5', hex: '#222221', usage: 'Gray tints and shades - Gray 6.5' },
        { name: '--made-color-gray-06', hex: '#323231', usage: 'Canvas color - Gray 6' },
        { name: '--made-color-gray-05-5', hex: '#444340', usage: 'Gray tints and shades - Gray 5.5' },
        { name: '--made-color-gray-05', hex: '#555250', usage: 'Canvas color - Gray 5' },
        { name: '--made-color-gray-04-5', hex: '#676561', usage: 'Gray tints and shades - Gray 4.5' },
        { name: '--made-color-gray-04', hex: '#777470', usage: 'Gray tints and shades - Gray 4' },
        { name: '--made-color-gray-03-5', hex: '#96918b', usage: 'Gray tints and shades - Gray 3.5' },
        { name: '--made-color-gray-03', hex: '#b1ada6', usage: 'Gray tints and shades - Gray 3' },
        { name: '--made-color-gray-02-5', hex: '#d1cdc7', usage: 'Canvas color - Gray 2.5' },
        { name: '--made-color-gray-02', hex: '#e8e5e1', usage: 'Canvas color - Gray 2' },
        { name: '--made-color-gray-01-5', hex: '#f3f0ee', usage: 'Canvas color - Gray 1.5' },
        { name: '--made-color-gray-01-25', hex: '#faf7f5', usage: 'Canvas color - Gray 1.25' },
        { name: '--made-color-gray-01', hex: '#fcfbfa', usage: 'Canvas color - Gray 1' },
        { name: '--made-color-gold-07', hex: '#301c00', usage: 'Gold color 7' },
        { name: '--made-color-gold-06', hex: '#583300', usage: 'Gold color 6' },
        { name: '--made-color-gold-05', hex: '#995600', usage: 'Gold color 5' },
        { name: '--made-color-gold-04', hex: '#f38b00', usage: 'Gold color 4' },
        { name: '--made-color-gold-03', hex: '#f7ad4c', usage: 'Gold color 3' },
        { name: '--made-color-gold-02', hex: '#f9d199', usage: 'Gold color 2' },
        { name: '--made-color-gold-01', hex: '#fce8cc', usage: 'Gold color 1' },
        { name: '--made-color-accent-07', hex: '#d7373c', usage: 'Accent color 7' },
        { name: '--made-color-accent-06', hex: '#25836d', usage: 'Accent color 6' },
        { name: '--made-color-accent-05', hex: '#628020', usage: 'Accent color 5' },
        { name: '--made-color-accent-04', hex: '#ffc61e', usage: 'Accent color 4' },
        { name: '--made-color-accent-03', hex: '#f38b00', usage: 'Accent color 3' },
        { name: '--made-color-accent-02', hex: '#f37338', usage: 'Accent color 2' },
        { name: '--made-color-accent-01-light', hex: '#d0805b', usage: 'Accent color 1- Light' },
        { name: '--made-color-accent-01-default', hex: '#cf4500', usage: 'Accent color 1' },
        { name: '--made-color-accent-01-darker', hex: '#331505', usage: 'Accent color 1 - Darker' },
        { name: '--made-color-accent-01-dark', hex: '#852d01', usage: 'Accent color 1 - Dark' },
        { name: '--made-color-brand-on-secondary', hex: '#ffffff', usage: 'The text color on your secondary brand color' },
        { name: '--made-color-brand-on-primary', hex: '#ffffff', usage: 'The text color on your primary brand color' },
        { name: '--made-color-action-on-dark-default', hex: '#ffffff', usage: 'Color of interactive color on dark background e.g. buttons' },
    ];
    
    const findClosestToken = (inputHex) => {
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
        };
        const colorDistance = (rgb1, rgb2) => Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));
        const inputRgb = hexToRgb(inputHex);
        if (!inputRgb) return null;
        let closest = null;
        let minDistance = Infinity;
        colorTokens.forEach(token => {
            const tokenRgb = hexToRgb(token.hex);
            if (tokenRgb) {
                const distance = colorDistance(inputRgb, tokenRgb);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = token;
                }
            }
        });
        return closest;
    };

    const closestToken = useMemo(() => findClosestToken(pickedColor), [pickedColor]);

    const colorDisplayStyles = { width: '120px', height: '120px', borderRadius: theme.borderRadius.full, border: `8px solid ${theme.colors.background.primary}`, boxShadow: theme.shadows.xl, cursor: 'pointer', position: 'relative' };
    const detailRowStyles = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md, padding: `${theme.spacing.xs} 0` };
    const detailLabelStyles = { fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.text.secondary };
    const detailValueStyles = { fontFamily: theme.typography.fontFamily.mono, fontWeight: theme.typography.fontWeight.bold, backgroundColor: theme.colors.background.secondary, padding: `${theme.spacing.xs} ${theme.spacing.sm}`, borderRadius: theme.borderRadius.sm };

    return (
        <PresentationCard>
            <SlideTitle>Interactive Color Token Matcher</SlideTitle>
            <p style={{ textAlign: 'center', maxWidth: '600px', margin: `0 auto ${theme.spacing.xl} auto`, lineHeight: 1.6 }}>
                Use the color picker to find the closest color token in our library. This demonstrates how a specific hex code can map to our design system.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: theme.spacing.xl, alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.lg, position: 'relative' }}>
                    <div style={{ ...colorDisplayStyles, backgroundColor: pickedColor }}>
                        <input type="color" value={pickedColor} onChange={(e) => setPickedColor(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: theme.spacing.md, padding: theme.spacing.sm, backgroundColor: theme.colors.background.primary, borderRadius: theme.borderRadius.md, border: `1px solid ${theme.colors.border.medium}` }}>
                        <Palette size={20} color={theme.colors.text.tertiary} />
                        <span style={{ fontFamily: 'monospace' }}>{pickedColor.toUpperCase()}</span>
                    </div>
                </div>
                {closestToken && (
                    <Card style={{ padding: theme.spacing.lg, border: `2px solid ${closestToken.hex}` }}>
                        <h3 style={{ fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md, fontSize: theme.typography.fontSize.lg }}>Closest Token Match</h3>
                        <div style={detailRowStyles}>
                            <span style={detailLabelStyles}>Preview</span>
                            <div style={{ width: '32px', height: '32px', borderRadius: theme.borderRadius.full, backgroundColor: closestToken.hex, border: `2px solid ${theme.colors.border.light}` }}></div>
                        </div>
                        <div style={detailRowStyles}>
                            <span style={detailLabelStyles}>Hex</span>
                            <span style={detailValueStyles}>{closestToken.hex.toUpperCase()}</span>
                        </div>
                        <div style={detailRowStyles}>
                            <span style={detailLabelStyles}>Token Name</span>
                            <span style={detailValueStyles}>{closestToken.name}</span>
                        </div>
                        <div style={{ ...detailRowStyles, display: 'block', textAlign: 'left' }}>
                            <span style={detailLabelStyles}>Description</span>
                            <p style={{ marginTop: theme.spacing.xs, fontSize: theme.typography.fontSize.sm, color: theme.colors.text.primary }}>{closestToken.usage}</p>
                        </div>
                    </Card>
                )}
            </div>
        </PresentationCard>
    );
};

const ClassExplanationSlide = () => {
    const codeBlockStyles = { backgroundColor: theme.colors.background.secondary, padding: theme.spacing.md, borderRadius: theme.borderRadius.md, fontFamily: theme.typography.fontFamily.mono, fontSize: theme.typography.fontSize.sm, border: `1px solid ${theme.colors.border.medium}`, color: theme.colors.text.primary };
    const headingStyles = { fontSize: theme.typography.fontSize['xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md, display: 'flex', alignItems: 'center', gap: theme.spacing.md };

    return (
        <PresentationCard>
            <SlideTitle>CSS Naming Conventions</SlideTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.xl }}>
                <div>
                    <h3 style={headingStyles}><span style={{ backgroundColor: theme.colors.primary, color: theme.colors.text.inverse, borderRadius: theme.borderRadius.sm, padding: `${theme.spacing.xs} ${theme.spacing.sm}` }}>C</span> Component Classes (.made-c-*)</h3>
                    <p>Styles a whole, reusable component like a button or card. Describes the component's role.</p>
                    <div style={{ ...codeBlockStyles, marginTop: theme.spacing.md }}>{`<button class="made-c-button made-c-button--primary">Click Me</button>`}</div>
                </div>
                <div>
                    <h3 style={headingStyles}><span style={{ backgroundColor: theme.colors.secondary, color: theme.colors.text.inverse, borderRadius: theme.borderRadius.sm, padding: `${theme.spacing.xs} ${theme.spacing.sm}` }}>U</span> Utility Classes (.made-u-*)</h3>
                    <p>Applies a single, specific style rule. Used to make minor adjustments to components.</p>
                    <div style={{ ...codeBlockStyles, marginTop: theme.spacing.md }}>{`<div class="made-u-text-center made-u-display-flex">...</div>`}</div>
                </div>
            </div>
            <div style={{ marginTop: theme.spacing.xl, paddingTop: theme.spacing.lg, borderTop: `1px solid ${theme.colors.border.light}` }}>
                <h3 style={{ ...headingStyles, justifyContent: 'center' }}><HelpCircle /> How to Use Them Together</h3>
                <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', lineHeight: 1.7 }}>
                    Always start with a component class (`.made-c-*`). Then, layer on utility classes (`.made-u-*`) for minor tweaks and adjustments. This keeps your UI consistent yet flexible.
                </p>
            </div>
        </PresentationCard>
    );
};

const ResourcesSlide = () => {
    const linkStyles = { display: 'flex', alignItems: 'center', gap: theme.spacing.md, padding: theme.spacing.md, borderRadius: theme.borderRadius.md, backgroundColor: theme.colors.background.primary, textDecoration: 'none', color: theme.colors.text.primary, fontWeight: theme.typography.fontWeight.semibold, border: `1px solid ${theme.colors.border.medium}` };
    
    return (
        <PresentationCard>
            <SlideTitle>Resources & Links</SlideTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.lg }}>
                <a href="https://mastercard.github.io/made/?path=/story/hello-introduction--page" target="_blank" rel="noopener noreferrer" style={linkStyles}>
                    <Book color={theme.colors.primary} />
                    <span>MADE Storybook</span>
                </a>
                <div style={{ ...linkStyles, backgroundColor: theme.colors.background.secondary, color: theme.colors.text.secondary, cursor: 'not-allowed' }}>
                    <LinkIcon />
                    <span>Figma Design Library (Placeholder)</span>
                </div>
                <div style={{ ...linkStyles, backgroundColor: theme.colors.background.secondary, color: theme.colors.text.secondary, cursor: 'not-allowed' }}>
                    <LinkIcon />
                    <span>Figma UI Kit (Placeholder)</span>
                </div>
            </div>
        </PresentationCard>
    );
};


// --- Main Presentation Component ---

const PresentationFlow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [<IntroSlide />, <ColorMatcherSlide />, <ClassExplanationSlide />, <ResourcesSlide />];

    const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    const progress = ((currentSlide + 1) / slides.length) * 100;

    const navButtonStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.sm,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        border: `1px solid ${theme.colors.border.medium}`,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.background.primary,
        cursor: 'pointer',
        fontWeight: theme.typography.fontWeight.semibold,
    };

    return (
        <section style={{ padding: `${theme.spacing['3xl']} 0`, backgroundColor: theme.colors.background.secondary, minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.xl}` }}>
                {/* Progress Bar */}
                <div style={{ marginBottom: theme.spacing.xl }}>
                    <div style={{ height: '8px', backgroundColor: theme.colors.border.light, borderRadius: theme.borderRadius.full, overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: theme.colors.primary, transition: 'width 0.3s ease' }}></div>
                    </div>
                    <p style={{ textAlign: 'right', marginTop: theme.spacing.xs, fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                        Step {currentSlide + 1} of {slides.length}
                    </p>
                </div>

                {/* Current Slide */}
                <div>{slides[currentSlide]}</div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: theme.spacing.xl }}>
                    <button onClick={handlePrev} disabled={currentSlide === 0} style={{ ...navButtonStyles, opacity: currentSlide === 0 ? 0.5 : 1 }}>
                        <ArrowLeft size={16} />
                        Previous
                    </button>
                    <button onClick={handleNext} disabled={currentSlide === slides.length - 1} style={{ ...navButtonStyles, opacity: currentSlide === slides.length - 1 ? 0.5 : 1 }}>
                        Next
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PresentationFlow;