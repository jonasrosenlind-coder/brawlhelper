/**
 * draw.js — Brawl Stars portrait-style head icon
 * Draws a brawler head/bust like the character select icons
 */

const OUTLINE = '#1a1a2e';
const OW = 2.5;

function drawBrawler(ctx, config, cx, cy, scale) {
    const s = scale || 1;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(s, s);

    const skin = config.skinColor || '#f0c4a0';
    const hair = config.hairColor || '#8B4513';
    const eyeColor = config.eyeColor || '#2c3e50';
    const face = config.face || 'round';
    const hairStyle = config.hairStyle || 'spiky';
    const eyes = config.eyes || 'normal';
    const mouth = config.mouth || 'smile';
    const headgear = config.headgear || 'none';
    const headgearColor = config.headgearColor || '#e74c3c';

    // Neck / shoulders hint
    drawShoulders(ctx, skin);

    // Head shape
    drawHead(ctx, face, skin);

    // Ears
    drawEars(ctx, face, skin);

    // Hair (behind if long/ponytail)
    if (hairStyle === 'long' || hairStyle === 'ponytail') {
        drawHairBack(ctx, hairStyle, hair, face);
    }

    // Hair front
    if (hairStyle !== 'bald') {
        drawHairFront(ctx, hairStyle, hair, face);
    }

    // Eyes
    drawEyes(ctx, eyes, eyeColor, face);

    // Eyebrows
    drawEyebrows(ctx, eyes, hair, face);

    // Mouth
    drawMouth(ctx, mouth, face);

    // Nose
    drawNose(ctx, face);

    // Cheeks
    ctx.fillStyle = 'rgba(255,130,100,0.18)';
    const cheekY = face === 'long' ? 12 : 8;
    ctx.beginPath();
    ctx.ellipse(-22, cheekY, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(22, cheekY, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Headgear (on top)
    if (headgear !== 'none') {
        drawHeadgear(ctx, headgear, headgearColor, face);
    }

    ctx.restore();
}

// === HEAD SHAPES ===

function drawHead(ctx, face, skin) {
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    if (face === 'square') {
        ctx.roundRect(-34, -38, 68, 68, 16);
    } else if (face === 'long') {
        ctx.ellipse(0, -2, 32, 42, 0, 0, Math.PI * 2);
    } else {
        ctx.arc(0, -4, 36, 0, Math.PI * 2);
    }
    ctx.fill();

    ctx.fillStyle = skin;
    ctx.beginPath();
    if (face === 'square') {
        ctx.roundRect(-32, -36, 64, 64, 14);
    } else if (face === 'long') {
        ctx.ellipse(0, -2, 30, 40, 0, 0, Math.PI * 2);
    } else {
        ctx.arc(0, -4, 34, 0, Math.PI * 2);
    }
    ctx.fill();

    // Head highlight
    const hg = ctx.createRadialGradient(-10, -20, 5, 0, -4, 34);
    hg.addColorStop(0, 'rgba(255,255,255,0.15)');
    hg.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = hg;
    ctx.beginPath();
    if (face === 'square') {
        ctx.roundRect(-32, -36, 64, 64, 14);
    } else if (face === 'long') {
        ctx.ellipse(0, -2, 30, 40, 0, 0, Math.PI * 2);
    } else {
        ctx.arc(0, -4, 34, 0, Math.PI * 2);
    }
    ctx.fill();
}

function drawEars(ctx, face, skin) {
    const earY = face === 'long' ? -2 : -4;
    const earX = face === 'square' ? 33 : (face === 'long' ? 29 : 33);
    [-1, 1].forEach(side => {
        outlinedEllipse(ctx, side * earX, earY, 8, 10, skin, OUTLINE, 2);
        // Inner ear
        ctx.fillStyle = darken(skin, 25);
        ctx.beginPath();
        ctx.ellipse(side * earX, earY, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawShoulders(ctx, skin) {
    ctx.fillStyle = OUTLINE;
    ctx.beginPath();
    ctx.roundRect(-38, 28, 76, 30, [0, 0, 20, 20]);
    ctx.fill();
    ctx.fillStyle = darken(skin, 15);
    ctx.beginPath();
    ctx.roundRect(-36, 30, 72, 26, [0, 0, 18, 18]);
    ctx.fill();
    // Collar line
    ctx.fillStyle = darken(skin, 30);
    ctx.beginPath();
    ctx.roundRect(-14, 28, 28, 6, 3);
    ctx.fill();
}

// === HAIR STYLES ===

function drawHairFront(ctx, style, color, face) {
    ctx.fillStyle = OUTLINE;
    const darkHair = darken(color, 20);

    if (style === 'spiky') {
        // Spiky hair like Brock/Colt
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.moveTo(-36, -14);
        ctx.lineTo(-34, -50);
        ctx.lineTo(-20, -42);
        ctx.lineTo(-16, -62);
        ctx.lineTo(-4, -46);
        ctx.lineTo(0, -66);
        ctx.lineTo(4, -46);
        ctx.lineTo(16, -62);
        ctx.lineTo(20, -42);
        ctx.lineTo(34, -50);
        ctx.lineTo(36, -14);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-34, -14);
        ctx.lineTo(-32, -48);
        ctx.lineTo(-19, -40);
        ctx.lineTo(-15, -59);
        ctx.lineTo(-3, -44);
        ctx.lineTo(0, -63);
        ctx.lineTo(3, -44);
        ctx.lineTo(15, -59);
        ctx.lineTo(19, -40);
        ctx.lineTo(32, -48);
        ctx.lineTo(34, -14);
        ctx.closePath();
        ctx.fill();
        // Highlight
        const hg = ctx.createLinearGradient(-20, -60, 10, -30);
        hg.addColorStop(0, lighten(color, 35));
        hg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.moveTo(-34, -14);
        ctx.lineTo(-32, -48);
        ctx.lineTo(-15, -59);
        ctx.lineTo(0, -63);
        ctx.lineTo(3, -44);
        ctx.lineTo(10, -30);
        ctx.lineTo(-10, -14);
        ctx.closePath();
        ctx.fill();
    } else if (style === 'mohawk') {
        // Center mohawk stripe
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.moveTo(-10, -16);
        ctx.lineTo(-12, -40);
        ctx.lineTo(-6, -70);
        ctx.lineTo(0, -74);
        ctx.lineTo(6, -70);
        ctx.lineTo(12, -40);
        ctx.lineTo(10, -16);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(-8, -16);
        ctx.lineTo(-10, -40);
        ctx.lineTo(-5, -68);
        ctx.lineTo(0, -71);
        ctx.lineTo(5, -68);
        ctx.lineTo(10, -40);
        ctx.lineTo(8, -16);
        ctx.closePath();
        ctx.fill();
    } else if (style === 'long') {
        // Long hair framing face
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.arc(0, -16, 38, Math.PI, 0, false);
        ctx.lineTo(38, 20);
        ctx.quadraticCurveTo(36, 30, 30, 34);
        ctx.lineTo(24, -10);
        ctx.lineTo(-24, -10);
        ctx.lineTo(-30, 34);
        ctx.quadraticCurveTo(-36, 30, -38, 20);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, -16, 36, Math.PI, 0, false);
        ctx.lineTo(36, 18);
        ctx.quadraticCurveTo(34, 28, 28, 32);
        ctx.lineTo(22, -10);
        ctx.lineTo(-22, -10);
        ctx.lineTo(-28, 32);
        ctx.quadraticCurveTo(-34, 28, -36, 18);
        ctx.closePath();
        ctx.fill();
    } else if (style === 'ponytail') {
        // Short top + ponytail behind
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.arc(0, -16, 38, Math.PI + 0.3, -0.3, false);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, -16, 36, Math.PI + 0.3, -0.3, false);
        ctx.closePath();
        ctx.fill();
    } else if (style === 'afro') {
        // Big round afro
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.arc(0, -22, 48, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, -22, 46, 0, Math.PI * 2);
        ctx.fill();
        // Afro texture dots
        ctx.fillStyle = lighten(color, 20);
        for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2;
            const r = 30 + Math.random() * 10;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r * 0.6, -22 + Math.sin(a) * r * 0.6, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawHairBack(ctx, style, color, face) {
    if (style === 'long') {
        // Hair behind ears
        ctx.fillStyle = darken(color, 15);
        ctx.beginPath();
        ctx.moveTo(-36, -10);
        ctx.lineTo(-40, 40);
        ctx.quadraticCurveTo(-38, 48, -30, 44);
        ctx.lineTo(-32, -5);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(36, -10);
        ctx.lineTo(40, 40);
        ctx.quadraticCurveTo(38, 48, 30, 44);
        ctx.lineTo(32, -5);
        ctx.closePath();
        ctx.fill();
    } else if (style === 'ponytail') {
        ctx.fillStyle = darken(color, 10);
        ctx.beginPath();
        ctx.moveTo(20, -30);
        ctx.quadraticCurveTo(42, -28, 44, -10);
        ctx.quadraticCurveTo(46, 10, 36, 40);
        ctx.quadraticCurveTo(30, 46, 28, 38);
        ctx.quadraticCurveTo(36, 10, 34, -10);
        ctx.quadraticCurveTo(32, -22, 20, -26);
        ctx.closePath();
        ctx.fill();
        // Hair tie
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.ellipse(38, -10, 5, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// === EYES ===

function drawEyes(ctx, style, color, face) {
    const eyeY = face === 'long' ? -6 : -8;
    const eyeSpacing = 14;

    [-1, 1].forEach(side => {
        const ex = side * eyeSpacing;

        if (style === 'robot') {
            // Robot/visor eye
            ctx.fillStyle = OUTLINE;
            ctx.beginPath();
            ctx.roundRect(ex - 10, eyeY - 8, 20, 16, 4);
            ctx.fill();
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.roundRect(ex - 8, eyeY - 6, 16, 12, 3);
            ctx.fill();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ex, eyeY, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = lighten(color, 60);
            ctx.beginPath();
            ctx.arc(ex - 1, eyeY - 2, 1.5, 0, Math.PI * 2);
            ctx.fill();
            return;
        }

        // Eye outline
        const eyeH = style === 'cute' ? 12 : (style === 'cool' ? 7 : 10);
        const eyeW = style === 'cute' ? 10 : 9;
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.ellipse(ex, eyeY, eyeW + 1.5, eyeH + 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eye white
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(ex, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
        ctx.fill();

        // Iris
        const irisR = style === 'cute' ? 6 : 5;
        const irisGrad = ctx.createRadialGradient(ex, eyeY, 1, ex, eyeY, irisR);
        irisGrad.addColorStop(0, lighten(color, 30));
        irisGrad.addColorStop(1, darken(color, 20));
        ctx.fillStyle = irisGrad;
        ctx.beginPath();
        ctx.arc(ex, eyeY + 1, irisR, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = '#0a0a15';
        ctx.beginPath();
        ctx.arc(ex, eyeY + 1, irisR * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Shine
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(ex - 2, eyeY - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(ex + 2, eyeY + 2, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Angry squint
        if (style === 'angry') {
            ctx.fillStyle = '#f0c4a0';
            ctx.beginPath();
            ctx.moveTo(ex - eyeW - 2, eyeY - eyeH);
            ctx.lineTo(ex + eyeW + 2, eyeY - eyeH + 5);
            ctx.lineTo(ex + eyeW + 2, eyeY - eyeH - 1);
            ctx.lineTo(ex - eyeW - 2, eyeY - eyeH - 4);
            ctx.closePath();
            ctx.fill();
        }

        // Evil glow
        if (style === 'evil') {
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ex, eyeY + 1, irisR, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#0a0a15';
            ctx.beginPath();
            ctx.ellipse(ex, eyeY + 1, 2, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cool half-closed
        if (style === 'cool') {
            ctx.fillStyle = '#f0c4a0';
            ctx.beginPath();
            ctx.rect(ex - eyeW - 2, eyeY - eyeH - 2, (eyeW + 2) * 2, eyeH * 0.5);
            ctx.fill();
        }
    });
}

// === EYEBROWS ===

function drawEyebrows(ctx, eyeStyle, hairColor, face) {
    const browY = face === 'long' ? -18 : -20;
    ctx.strokeStyle = darken(hairColor, 25);
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';

    if (eyeStyle === 'angry' || eyeStyle === 'evil') {
        // V-shaped angry brows
        ctx.beginPath();
        ctx.moveTo(-22, browY + 2);
        ctx.lineTo(-10, browY - 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(22, browY + 2);
        ctx.lineTo(10, browY - 4);
        ctx.stroke();
    } else if (eyeStyle === 'cool') {
        // Flat cool brows
        ctx.beginPath();
        ctx.moveTo(-20, browY);
        ctx.lineTo(-8, browY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, browY);
        ctx.lineTo(8, browY);
        ctx.stroke();
    } else {
        // Normal arched brows
        ctx.beginPath();
        ctx.moveTo(-20, browY);
        ctx.quadraticCurveTo(-14, browY - 5, -8, browY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, browY);
        ctx.quadraticCurveTo(14, browY - 5, 8, browY);
        ctx.stroke();
    }
}

// === MOUTH ===

function drawMouth(ctx, style, face) {
    const mouthY = face === 'long' ? 16 : 12;

    if (style === 'grin') {
        // Wide grin with teeth
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-14, mouthY - 2, 28, 14, 7);
        ctx.fill();
        ctx.fillStyle = '#8b1a1a';
        ctx.beginPath();
        ctx.roundRect(-12, mouthY, 24, 10, 5);
        ctx.fill();
        // Teeth
        ctx.fillStyle = '#fff';
        for (let i = -10; i <= 8; i += 6) {
            ctx.beginPath();
            ctx.roundRect(i, mouthY, 5, 5, 1);
            ctx.fill();
        }
        // Tongue
        ctx.fillStyle = '#e55';
        ctx.beginPath();
        ctx.ellipse(0, mouthY + 8, 6, 4, 0, 0, Math.PI);
        ctx.fill();
    } else if (style === 'angry') {
        // Frown
        ctx.strokeStyle = '#6b2020';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, mouthY + 10, 8, Math.PI + 0.4, -0.4);
        ctx.stroke();
    } else if (style === 'open') {
        // Surprised O
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.ellipse(0, mouthY + 4, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#6b1a1a';
        ctx.beginPath();
        ctx.ellipse(0, mouthY + 4, 8, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tongue
        ctx.fillStyle = '#e55';
        ctx.beginPath();
        ctx.ellipse(0, mouthY + 10, 5, 4, 0, 0, Math.PI);
        ctx.fill();
    } else if (style === 'smirk') {
        // One-sided smirk
        ctx.strokeStyle = '#7b3030';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-6, mouthY + 2);
        ctx.quadraticCurveTo(4, mouthY + 6, 10, mouthY - 2);
        ctx.stroke();
    } else {
        // Default smile with tooth
        ctx.strokeStyle = '#7b3030';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, mouthY, 7, 0.15, Math.PI - 0.15);
        ctx.stroke();
        // Tooth
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.roundRect(-3, mouthY, 6, 4, 1);
        ctx.fill();
    }
}

// === NOSE ===

function drawNose(ctx, face) {
    const noseY = face === 'long' ? 4 : 2;
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.beginPath();
    ctx.ellipse(0, noseY, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Nostril highlights
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.arc(-2, noseY + 1, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(2, noseY + 1, 1.5, 0, Math.PI * 2);
    ctx.fill();
}

// === HEADGEAR ===

function drawHeadgear(ctx, type, color, face) {
    if (type === 'hat') {
        // Classic hat
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-38, -30, 76, 10, 5);
        ctx.fill();
        ctx.fillStyle = darken(color, 10);
        ctx.beginPath();
        ctx.roundRect(-36, -28, 72, 8, 4);
        ctx.fill();
        // Crown
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-24, -58, 48, 32, [12, 12, 3, 3]);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-22, -56, 44, 28, [10, 10, 2, 2]);
        ctx.fill();
        const hg = ctx.createLinearGradient(0, -56, 0, -28);
        hg.addColorStop(0, lighten(color, 30));
        hg.addColorStop(1, color);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.roundRect(-22, -56, 44, 28, [10, 10, 2, 2]);
        ctx.fill();
        // Band
        ctx.fillStyle = darken(color, 35);
        ctx.beginPath();
        ctx.roundRect(-22, -32, 44, 6, 2);
        ctx.fill();
    } else if (type === 'helmet') {
        // Full helmet
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.arc(0, -18, 40, Math.PI, 0, false);
        ctx.lineTo(40, -4);
        ctx.quadraticCurveTo(40, 2, 36, 2);
        ctx.lineTo(-36, 2);
        ctx.quadraticCurveTo(-40, 2, -40, -4);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, -18, 38, Math.PI, 0, false);
        ctx.lineTo(38, -4);
        ctx.quadraticCurveTo(38, 0, 34, 0);
        ctx.lineTo(-34, 0);
        ctx.quadraticCurveTo(-38, 0, -38, -4);
        ctx.closePath();
        ctx.fill();
        // Visor stripe
        ctx.fillStyle = darken(color, 25);
        ctx.beginPath();
        ctx.roundRect(-30, -10, 60, 8, 3);
        ctx.fill();
        // Highlight
        ctx.fillStyle = lighten(color, 40);
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, -18, 30, Math.PI + 0.5, -0.5, false);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    } else if (type === 'bandana') {
        // Wrapped bandana
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-36, -26, 72, 16, 6);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-34, -24, 68, 12, 5);
        ctx.fill();
        // Knot
        ctx.fillStyle = darken(color, 15);
        ctx.beginPath();
        ctx.moveTo(28, -18);
        ctx.lineTo(42, -26);
        ctx.lineTo(44, -20);
        ctx.lineTo(32, -14);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(28, -18);
        ctx.lineTo(40, -10);
        ctx.lineTo(42, -16);
        ctx.lineTo(32, -18);
        ctx.closePath();
        ctx.fill();
        // Pattern dots
        ctx.fillStyle = lighten(color, 40);
        for (let i = -24; i <= 20; i += 10) {
            ctx.beginPath();
            ctx.arc(i, -18, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (type === 'crown') {
        // Royal crown
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.moveTo(-28, -22);
        ctx.lineTo(-30, -50);
        ctx.lineTo(-18, -38);
        ctx.lineTo(-8, -54);
        ctx.lineTo(0, -40);
        ctx.lineTo(8, -54);
        ctx.lineTo(18, -38);
        ctx.lineTo(30, -50);
        ctx.lineTo(28, -22);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(-26, -22);
        ctx.lineTo(-28, -48);
        ctx.lineTo(-17, -36);
        ctx.lineTo(-7, -51);
        ctx.lineTo(0, -38);
        ctx.lineTo(7, -51);
        ctx.lineTo(17, -36);
        ctx.lineTo(28, -48);
        ctx.lineTo(26, -22);
        ctx.closePath();
        ctx.fill();
        // Band
        ctx.fillStyle = '#b8860b';
        ctx.beginPath();
        ctx.roundRect(-26, -26, 52, 8, 3);
        ctx.fill();
        // Gems
        ctx.fillStyle = '#e74c3c';
        outlinedCircle(ctx, -12, -22, 4, '#e74c3c', '#b8860b', 1.5);
        outlinedCircle(ctx, 0, -22, 5, '#3498db', '#b8860b', 1.5);
        outlinedCircle(ctx, 12, -22, 4, '#2ecc71', '#b8860b', 1.5);
    } else if (type === 'goggles') {
        // Goggles on forehead
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-28, -24, 56, 16, 8);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-26, -22, 52, 12, 6);
        ctx.fill();
        // Lenses
        [-12, 12].forEach(lx => {
            ctx.fillStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(lx, -16, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#8ecae6';
            ctx.beginPath();
            ctx.arc(lx, -16, 8, 0, Math.PI * 2);
            ctx.fill();
            // Lens reflection
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.beginPath();
            ctx.arc(lx - 2, -19, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        // Strap
        ctx.fillStyle = darken(color, 20);
        ctx.beginPath();
        ctx.roundRect(-36, -20, 10, 6, 2);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(26, -20, 10, 6, 2);
        ctx.fill();
    } else if (type === 'mask') {
        // Lower-face mask
        ctx.fillStyle = OUTLINE;
        ctx.beginPath();
        ctx.roundRect(-28, -2, 56, 28, [4, 4, 14, 14]);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(-26, 0, 52, 24, [3, 3, 12, 12]);
        ctx.fill();
        // Mask pattern
        ctx.strokeStyle = darken(color, 20);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-20, 8);
        ctx.lineTo(-10, 12);
        ctx.lineTo(0, 8);
        ctx.lineTo(10, 12);
        ctx.lineTo(20, 8);
        ctx.stroke();
        // Skull/X decoration
        ctx.fillStyle = darken(color, 40);
        ctx.beginPath();
        ctx.moveTo(-4, 14);
        ctx.lineTo(4, 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(4, 14);
        ctx.lineTo(-4, 20);
        ctx.stroke();
    }
}

// === HELPERS ===

function outlinedCircle(ctx, x, y, r, fill, stroke, lineW) {
    ctx.fillStyle = stroke;
    ctx.beginPath();
    ctx.arc(x, y, r + lineW / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function outlinedEllipse(ctx, x, y, rx, ry, fill, stroke, lineW) {
    ctx.fillStyle = stroke;
    ctx.beginPath();
    ctx.ellipse(x, y, rx + lineW / 2, ry + lineW / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
}

function darken(hex, amount) { return adjustColor(hex, -amount); }
function lighten(hex, amount) { return adjustColor(hex, amount); }

function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substring(4, 6), 16) + amount));
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

function getSizeScale(size) {
    switch (size) {
        case 'small': return 0.7;
        case 'large': return 1.3;
        default: return 1.0;
    }
}
