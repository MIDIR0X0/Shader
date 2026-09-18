"use strict";

const root = document.getElementById("labRoot");

root.innerHTML = `
<div class="lab-app">
    <aside class="lab-sidebar">
        <header class="lab-brand">
            <p class="lab-eyebrow">Value Study Tool</p>
            <h1>Miniature<br>Light Lab</h1>
            <p class="lab-subtitle">把灰模照片转换成可操纵的光影与明暗色块参考。所有处理仅在本机浏览器完成。</p>
        </header>

        <section class="lab-section" aria-labelledby="labPhotoTitle">
            <div class="lab-section-head"><h2 id="labPhotoTitle" class="lab-section-title">01 · 模型照片</h2><span id="labImageMeta" class="lab-section-note">等待照片</span></div>
            <div class="lab-upload-row">
                <label class="lab-file-button">选择照片<input id="labUpload" type="file" accept="image/jpeg,image/png,image/webp"></label>
                <button id="labSampleBtn" class="lab-button" type="button">使用示例</button>
            </div>
            <div class="lab-control-grid">
                <div class="lab-control"><label for="labCropZoom"><span>取景缩放</span><span id="labCropZoomValue" class="lab-readout">1.00×</span></label><input id="labCropZoom" type="range" min="100" max="400" value="100" disabled></div>
                <div class="lab-control"><label for="labDetail"><span>形体尺度</span><span id="labDetailValue" class="lab-readout">5</span></label><input id="labDetail" type="range" min="1" max="9" value="5" disabled></div>
                <div class="lab-control"><label for="labCropX"><span>水平取景</span><span id="labCropXValue" class="lab-readout">50%</span></label><input id="labCropX" type="range" min="0" max="100" value="50" disabled></div>
                <div class="lab-control"><label for="labCropY"><span>垂直取景</span><span id="labCropYValue" class="lab-readout">50%</span></label><input id="labCropY" type="range" min="0" max="100" value="50" disabled></div>
            </div>
            <div class="lab-mask-panel">
                <div class="lab-mask-actions">
                    <button id="labMaskToggle" class="lab-button" type="button" disabled>编辑主体蒙版</button>
                    <button id="labMaskReset" class="lab-button" type="button" disabled>重置蒙版</button>
                </div>
                <div id="labMaskTools" class="lab-mask-tools" hidden>
                    <div class="lab-segmented" role="group" aria-label="蒙版画笔模式">
                        <button class="active" type="button" data-mask-action="remove" aria-pressed="true">擦除背景</button>
                        <button type="button" data-mask-action="restore" aria-pressed="false">恢复主体</button>
                    </div>
                    <div class="lab-control"><label for="labBrushSize"><span>画笔大小</span><span id="labBrushSizeValue" class="lab-readout">8%</span></label><input id="labBrushSize" type="range" min="2" max="30" value="8"></div>
                    <small>直接在右侧图片上涂抹。改变取景或形体尺度会重置蒙版。</small>
                </div>
            </div>
        </section>

        <section class="lab-section" aria-labelledby="labLightTitle">
            <div class="lab-section-head"><h2 id="labLightTitle" class="lab-section-title">02 · 主光方向</h2><span id="labLightValue" class="lab-section-note">左上 · 低角度</span></div>
            <div class="lab-light-wrap">
                <div id="labLightPad" class="lab-light-pad" role="slider" tabindex="0" aria-label="主光方向" aria-valuemin="0" aria-valuemax="360" aria-valuenow="228"><div id="labLightDot" class="lab-light-dot"></div></div>
                <div class="lab-light-copy"><strong>拖动光点</strong>中心是正面顶光，越靠近边缘，光线越贴近模型表面。方向键可微调。</div>
            </div>
            <div class="lab-control-grid">
                <div class="lab-control"><label for="labIntensity"><span>主光强度</span><span id="labIntensityValue" class="lab-readout">78</span></label><input id="labIntensity" type="range" min="0" max="120" value="78"></div>
                <div class="lab-control"><label for="labAmbient"><span>环境补光</span><span id="labAmbientValue" class="lab-readout">24</span></label><input id="labAmbient" type="range" min="0" max="80" value="24"></div>
                <div class="lab-control"><label for="labRelief"><span>形体响应</span><span id="labReliefValue" class="lab-readout">58</span></label><input id="labRelief" type="range" min="0" max="100" value="58"></div>
                <div class="lab-control"><label for="labContrast"><span>明暗对比</span><span id="labContrastValue" class="lab-readout">64</span></label><input id="labContrast" type="range" min="0" max="100" value="64"></div>
            </div>
        </section>

        <section class="lab-section" aria-labelledby="labModeTitle">
            <div class="lab-section-head"><h2 id="labModeTitle" class="lab-section-title">03 · 涂装参考</h2><span class="lab-section-note">选择输出语言</span></div>
            <div class="lab-mode-grid" role="group" aria-label="参考图模式">
                <button class="lab-mode-btn" type="button" data-mode="soft" aria-pressed="false"><span>光影色彩</span><small>保留底色与自然过渡</small></button>
                <button class="lab-mode-btn" type="button" data-mode="value" aria-pressed="false"><span>纯明度图</span><small>排除色相干扰</small></button>
                <button class="lab-mode-btn" type="button" data-mode="bands" aria-pressed="false"><span>明暗色块</span><small>直接照着分区上色</small></button>
                <button class="lab-mode-btn" type="button" data-mode="contour" aria-pressed="false"><span>色块边界</span><small>强调明暗交界线</small></button>
                <button class="lab-mode-btn lab-mode-btn-wide active" type="button" data-mode="prep" aria-pressed="true"><span>预明暗施工图</span><small>把理想光影压缩成实际可画的三个阶段</small></button>
            </div>
            <div id="labPrepPanel" class="lab-prep-panel">
                <div class="lab-prep-options">
                    <label for="labPrepPreset"><span>灰阶预设</span><select id="labPrepPreset">
                        <option value="gray">灰底预明暗</option>
                        <option value="classic">经典天顶光</option>
                        <option value="nmm">NMM 素描底稿</option>
                    </select></label>
                    <label for="labPrepTechnique"><span>施工方式</span><select id="labPrepTechnique">
                        <option value="hand">手涂分区</option>
                        <option value="dry">干扫凸起</option>
                        <option value="air">喷笔渐变</option>
                    </select></label>
                </div>
                <div class="lab-prep-steps" role="group" aria-label="施工步骤">
                    <button type="button" data-prep-step="0">1 阴影块</button>
                    <button type="button" data-prep-step="1">2 主亮面</button>
                    <button class="active" type="button" data-prep-step="2">3 边缘点亮</button>
                </div>
                <div class="lab-control"><label for="labPrepRange"><span>亮面范围</span><span id="labPrepRangeValue" class="lab-readout">45%</span></label><input id="labPrepRange" type="range" min="20" max="80" value="45"></div>
                <p id="labPrepInstruction">第 3 阶段：只在最高凸起、刃口与焦点处点少量白色；不追求连续完美的光带。</p>
                <button id="labExportSheetBtn" class="lab-button lab-sheet-btn" type="button" disabled>导出原图＋三步施工单</button>
            </div>
            <div class="lab-control"><label for="labLevels"><span>色阶数量</span><span id="labLevelsValue" class="lab-readout">5 阶</span></label><input id="labLevels" type="range" min="3" max="7" value="5"></div>
            <div class="lab-palette-wrap">
                <span class="lab-palette-caption">实体漆自动色阶 · 搜索并选择一款主色</span>
                <div class="lab-paint-search">
                    <input id="labPaintSearch" type="search" autocomplete="off" placeholder="例如 Macragge、70.950、AK 3rd Gen" aria-label="搜索实体漆">
                    <div id="labPaintResults" class="lab-paint-results" hidden></div>
                </div>
                <div id="labRampSummary" class="lab-ramp-summary">尚未选择实体漆；也可以直接修改下面三个颜色。</div>
                <div class="lab-palette" aria-label="涂装色阶">
                    <label><span>阴影色</span><input id="labShadowColor" type="color" value="#26343a"></label>
                    <label><span>中间色</span><input id="labMidColor" type="color" value="#78866b"></label>
                    <label><span>高光色</span><input id="labHighlightColor" type="color" value="#dce6bd"></label>
                </div>
                <div class="lab-paint-credit">包含 2,456 款 GW／Vallejo／AK 色值 · <a href="data/miniature-paints-LICENSE.txt" target="_blank">MIT 许可</a></div>
            </div>
        </section>

        <section class="lab-section" aria-labelledby="labCompareTitle">
            <div class="lab-section-head"><h2 id="labCompareTitle" class="lab-section-title">04 · 检查与导出</h2><span class="lab-section-note">左原图 / 右参考</span></div>
            <div class="lab-control"><label for="labCompare"><span>原图对比</span><span id="labCompareValue" class="lab-readout">关闭</span></label><input id="labCompare" type="range" min="0" max="100" value="0"></div>
            <button id="labExportBtn" class="lab-export-btn" type="button" disabled>导出高分辨率参考 PNG</button>
            <p class="lab-privacy">照片不会离开当前设备。导出最长边为 3000 px，适合放大检查和涂装参考。</p>
        </section>
    </aside>

    <main class="lab-workspace">
        <div class="lab-topbar"><span id="labViewBadge" class="lab-badge">预明暗施工图 · 边缘点亮</span><span id="labStatus" class="lab-status" role="status" aria-live="polite">等待上传</span></div>
        <div class="lab-stage">
            <div id="labEmpty" class="lab-empty"><div class="lab-empty-mark">◐</div><h2>从一张清晰的模型照片开始</h2><p>最好使用灰模、纯色底漆或底色接近的照片。尽量让模型占据画面主体，并避免强烈的原始投影与杂乱背景。</p></div>
            <div id="labCanvasShell" class="lab-canvas-shell"><canvas id="labView" aria-label="光影参考预览"></canvas><div id="labCompareLine" class="lab-compare-line"></div></div>
        </div>
        <div class="lab-legend"><span>提示：形体尺度越高，越忽略细小纹理并保留大体积</span><span class="lab-tone-strip" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i></span></div>
    </main>
</div>`;

const $ = id => document.getElementById(id);
const ui = {
    upload: $("labUpload"), sampleBtn: $("labSampleBtn"), exportBtn: $("labExportBtn"), exportSheetBtn: $("labExportSheetBtn"),
    cropZoom: $("labCropZoom"), cropX: $("labCropX"), cropY: $("labCropY"), detail: $("labDetail"),
    maskToggle: $("labMaskToggle"), maskReset: $("labMaskReset"), maskTools: $("labMaskTools"), brushSize: $("labBrushSize"),
    intensity: $("labIntensity"), ambient: $("labAmbient"), relief: $("labRelief"), contrast: $("labContrast"),
    levels: $("labLevels"), compare: $("labCompare"), lightPad: $("labLightPad"), lightDot: $("labLightDot"),
    prepPanel: $("labPrepPanel"), prepPreset: $("labPrepPreset"), prepTechnique: $("labPrepTechnique"), prepRange: $("labPrepRange"), prepInstruction: $("labPrepInstruction"),
    shadowColor: $("labShadowColor"), midColor: $("labMidColor"), highlightColor: $("labHighlightColor"),
    paintSearch: $("labPaintSearch"), paintResults: $("labPaintResults"), rampSummary: $("labRampSummary"),
    view: $("labView"), shell: $("labCanvasShell"), empty: $("labEmpty"), compareLine: $("labCompareLine"),
    imageMeta: $("labImageMeta"), status: $("labStatus"), viewBadge: $("labViewBadge"), lightValue: $("labLightValue")
};
const valueNodes = {
    cropZoom: $("labCropZoomValue"), cropX: $("labCropXValue"), cropY: $("labCropYValue"), detail: $("labDetailValue"),
    brushSize: $("labBrushSizeValue"),
    intensity: $("labIntensityValue"), ambient: $("labAmbientValue"), relief: $("labReliefValue"),
    contrast: $("labContrastValue"), levels: $("labLevelsValue"), compare: $("labCompareValue"), prepRange: $("labPrepRangeValue")
};

const previewSource = document.createElement("canvas");
const previewResult = document.createElement("canvas");
const maskCanvas = document.createElement("canvas");
let cachedPreviewMaskPixels = null;
const viewCtx = ui.view.getContext("2d", { alpha: false });
const state = {
    image: null, fileName: "miniature", surface: null, mode: "prep",
    lightX: -0.5, lightY: -0.55, lightDragging: false, compareDragging: false,
    maskMode: false, maskAction: "remove", maskDragging: false, maskLastPoint: null,
    prepStep: 2, cropTimer: 0, renderFrame: 0, buildToken: 0
};
const modeNames = { soft: "光影色彩", value: "纯明度图", bands: "明暗色块", contour: "色块边界", prep: "预明暗施工图" };
const prepStepNames = ["阴影块", "主亮面", "边缘点亮"];
const prepInstructions = [
    "第 1 阶段：灰底完成后，把底部、遮挡区与背光面合并成少数几个大阴影块。",
    "第 2 阶段：从主光方向铺出可一两笔完成的浅灰主亮面，不追小碎光。",
    "第 3 阶段：只在最高凸起、刃口与焦点处点少量白色；不追求连续完美的光带。"
];
const prepTechniqueNotes = {
    hand: "手涂把每个区域收束成一道软边，不再生成重复的平行轮廓。",
    dry: "干扫会优先抓取凸起纹理，凹面保持更暗。",
    air: "喷笔保留连续柔和的覆盖，适合作为方向参考而非逐块照抄。"
};
const prepPalettes = {
    gray: ["#151719", "#3f4445", "#777c7b", "#b9bdb8", "#f4f1e8"],
    classic: ["#101112", "#252829", "#555a59", "#aeb2ae", "#f5f3ec"],
    nmm: ["#0b0e10", "#2b3236", "#687176", "#d0d2cc", "#ffffff"]
};
const paintCatalog = window.MINIATURE_PAINT_CATALOG?.paints ?? [];
const paintBrandNames = { gw: "GW", av: "Vallejo", ak: "AK" };

function clamp(value, min = 0, max = 1) { return Math.min(max, Math.max(min, value)); }
function smoothstep(edge0, edge1, value) {
    const amount = clamp((value - edge0) / (edge1 - edge0));
    return amount * amount * (3 - 2 * amount);
}

function prepHighlightRange(values, maskPixels = null) {
    const histogram = new Uint32Array(256);
    let count = 0;
    for (let i = 0, p = 0; i < values.length; i++, p += 4) {
        if (maskPixels && maskPixels[p] < 128) continue;
        histogram[Math.round(clamp(values[i]) * 255)]++;
        count++;
    }
    if (!count) return [.7, 1];
    const quantile = fraction => {
        const target = count * fraction;
        let seen = 0;
        for (let bin = 0; bin < histogram.length; bin++) {
            seen += histogram[bin];
            if (seen >= target) return bin / 255;
        }
        return 1;
    };
    const low = quantile(.7);
    const high = quantile(.98);
    return high - low >= .04 ? [low, high] : [Math.max(0, high - .08), high];
}

function prepPixel(guideValue, localRise, technique, prepStep, prepPalette, lightRange = .45, highlightGuide = guideValue) {
    const guide = clamp(guideValue);
    const makePaintable = coverage => technique === "hand"
        ? smoothstep(.12, .88, coverage)
        : coverage;
    const range = clamp((lightRange - .2) / .6);
    const mainStart = .58 - range * .2;
    const mainEnd = .85 - range * .1;
    const edgeStart = .62 - range * .22;
    const edgeEnd = .96 - range * .14;
    let red = prepPalette[2][0], green = prepPalette[2][1], blue = prepPalette[2][2];
    if (prepStep >= 0) {
        const shadowCoverage = makePaintable(1 - smoothstep(.3, .59, guide));
        const deepCoverage = makePaintable(1 - smoothstep(.1, .34, guide));
        red += (prepPalette[1][0] - red) * shadowCoverage * .86;
        green += (prepPalette[1][1] - green) * shadowCoverage * .86;
        blue += (prepPalette[1][2] - blue) * shadowCoverage * .86;
        red += (prepPalette[0][0] - red) * deepCoverage * .66;
        green += (prepPalette[0][1] - green) * deepCoverage * .66;
        blue += (prepPalette[0][2] - blue) * deepCoverage * .66;
    }
    if (prepStep >= 1) {
        let lightCoverage = makePaintable(smoothstep(mainStart, mainEnd, guide));
        if (technique === "dry") lightCoverage *= .62 + localRise * .38;
        red += (prepPalette[3][0] - red) * lightCoverage;
        green += (prepPalette[3][1] - green) * lightCoverage;
        blue += (prepPalette[3][2] - blue) * lightCoverage;
    }
    if (prepStep >= 2) {
        let edgeCoverage = makePaintable(smoothstep(edgeStart, edgeEnd, highlightGuide));
        if (technique === "hand") edgeCoverage *= .28 + localRise * .48;
        if (technique === "dry") edgeCoverage *= .18 + localRise * .82;
        red += (prepPalette[4][0] - red) * edgeCoverage;
        green += (prepPalette[4][1] - green) * edgeCoverage;
        blue += (prepPalette[4][2] - blue) * edgeCoverage;
    }
    return [red, green, blue];
}
function setStatus(message, tone = "normal") { ui.status.textContent = message; ui.status.dataset.tone = tone; }

function hexRgb(hex) {
    const value = Number.parseInt(hex.slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function paletteColor(value, shadow, middle, highlight) {
    const from = value < .5 ? shadow : middle;
    const to = value < .5 ? middle : highlight;
    const amount = value < .5 ? value * 2 : (value - .5) * 2;
    return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

const paintLabCache = new Map();

function paintLab(paint) {
    if (paintLabCache.has(paint.id)) return paintLabCache.get(paint.id);
    const rgb = hexRgb(paint.hex).map(channel => {
        const value = channel / 255;
        return value <= .04045 ? value / 12.92 : Math.pow((value + .055) / 1.055, 2.4);
    });
    const l = .4122214708 * rgb[0] + .5363325363 * rgb[1] + .0514459929 * rgb[2];
    const m = .2119034982 * rgb[0] + .6806995451 * rgb[1] + .1073969566 * rgb[2];
    const s = .0883024619 * rgb[0] + .2817188376 * rgb[1] + .6299787005 * rgb[2];
    const l3 = Math.cbrt(l), m3 = Math.cbrt(m), s3 = Math.cbrt(s);
    const lab = {
        L: .2104542553 * l3 + .793617785 * m3 - .0040720468 * s3,
        a: 1.9779984951 * l3 - 2.428592205 * m3 + .4505937099 * s3,
        b: .0259040371 * l3 + .7827717662 * m3 - .808675766 * s3
    };
    paintLabCache.set(paint.id, lab);
    return lab;
}

function nearestRampPaint(base, role) {
    const origin = paintLab(base);
    const direction = role === "shadow" ? -1 : 1;
    const target = {
        L: clamp(origin.L + direction * (role === "shadow" ? .27 : .3)),
        a: origin.a * (role === "shadow" ? .9 : .72),
        b: origin.b * (role === "shadow" ? .9 : .72)
    };
    const unsuitable = /metal|transparent|contrast|shade|wash|ink|fluor|air/i;
    let candidates = paintCatalog.filter(paint => {
        if (paint.id === base.id || paint.brand !== base.brand || unsuitable.test(paint.range)) return false;
        const delta = paintLab(paint).L - origin.L;
        return role === "shadow" ? delta < -.07 : delta > .07;
    });
    if (!candidates.length) {
        candidates = paintCatalog.filter(paint => paint.id !== base.id && paint.brand === base.brand);
    }
    return candidates.reduce((best, paint) => {
        const lab = paintLab(paint);
        const originHue = Math.atan2(origin.b, origin.a);
        const paintHue = Math.atan2(lab.b, lab.a);
        let hueDistance = Math.abs(originHue - paintHue);
        hueDistance = Math.min(hueDistance, Math.PI * 2 - hueDistance) / Math.PI;
        const huePenalty = Math.hypot(origin.a, origin.b) > .025 ? hueDistance * .5 : 0;
        const score = Math.abs(lab.L - target.L) * 2.4 + Math.hypot(lab.a - target.a, lab.b - target.b) * 1.35 + huePenalty;
        return !best || score < best.score ? { paint, score } : best;
    }, null)?.paint ?? base;
}

function rampChip(role, paint) {
    const chip = document.createElement("span");
    chip.className = "lab-ramp-chip";
    const swatch = document.createElement("i");
    swatch.style.background = paint.hex;
    const text = document.createElement("span");
    text.textContent = role + " · " + (paintBrandNames[paint.brand] || paint.brand) + " " + paint.name;
    chip.append(swatch, text);
    return chip;
}

function applyPaintRamp(base) {
    const shadow = nearestRampPaint(base, "shadow");
    const highlight = nearestRampPaint(base, "highlight");
    ui.shadowColor.value = shadow.hex;
    ui.midColor.value = base.hex;
    ui.highlightColor.value = highlight.hex;
    ui.rampSummary.replaceChildren(
        rampChip("阴影", shadow),
        rampChip("主色", base),
        rampChip("高光", highlight)
    );
    ui.paintSearch.value = (paintBrandNames[base.brand] || base.brand) + " · " + base.name;
    ui.paintResults.hidden = true;
    document.querySelector('.lab-mode-btn[data-mode="bands"]')?.click();
    setStatus("已生成同品牌 NMM 高反差色阶");
}

function renderPaintResults(query) {
    const normalized = query.normalize("NFKD").toLowerCase().trim();
    ui.paintResults.replaceChildren();
    if (normalized.length < 2 || !paintCatalog.length) {
        ui.paintResults.hidden = true;
        return;
    }
    const matches = paintCatalog
        .map(paint => {
            const haystack = `${paintBrandNames[paint.brand] || paint.brand} ${paint.name} ${paint.code} ${paint.range}`.normalize("NFKD").toLowerCase();
            return { paint, rank: haystack.indexOf(normalized) };
        })
        .filter(result => result.rank >= 0)
        .sort((a, b) => a.rank - b.rank || a.paint.name.length - b.paint.name.length)
        .slice(0, 10);
    if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "lab-paint-empty";
        empty.textContent = "没有找到匹配的实体漆";
        ui.paintResults.append(empty);
    } else {
        matches.forEach(({ paint }) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "lab-paint-result";
            const swatch = document.createElement("i");
            swatch.style.background = paint.hex;
            const name = document.createElement("strong");
            name.textContent = paint.name;
            const meta = document.createElement("small");
            meta.textContent = `${paintBrandNames[paint.brand] || paint.brand} · ${paint.code || paint.range} · ${paint.hex}`;
            button.append(swatch, name, meta);
            button.addEventListener("click", () => applyPaintRamp(paint));
            ui.paintResults.append(button);
        });
    }
    ui.paintResults.hidden = false;
}

function updateReadouts() {
    valueNodes.cropZoom.textContent = (Number(ui.cropZoom.value) / 100).toFixed(2) + "×";
    valueNodes.cropX.textContent = ui.cropX.value + "%";
    valueNodes.cropY.textContent = ui.cropY.value + "%";
    valueNodes.detail.textContent = ui.detail.value;
    valueNodes.brushSize.textContent = ui.brushSize.value + "%";
    valueNodes.intensity.textContent = ui.intensity.value;
    valueNodes.ambient.textContent = ui.ambient.value;
    valueNodes.relief.textContent = ui.relief.value;
    valueNodes.contrast.textContent = ui.contrast.value;
    valueNodes.levels.textContent = ui.levels.value + " 阶";
    valueNodes.compare.textContent = Number(ui.compare.value) === 0 ? "关闭" : ui.compare.value + "%";
    valueNodes.prepRange.textContent = ui.prepRange.value + "%";
    ui.viewBadge.textContent = state.mode === "bands" || state.mode === "contour"
        ? modeNames[state.mode] + " · " + ui.levels.value + " 阶"
        : state.mode === "prep" ? modeNames.prep + " · " + prepStepNames[state.prepStep] : modeNames[state.mode];
    ui.exportBtn.textContent = state.mode === "prep"
        ? `导出第 ${state.prepStep + 1} 步施工图 PNG`
        : "导出高分辨率参考 PNG";
}

function setImageControls(enabled) {
    [ui.cropZoom, ui.cropX, ui.cropY, ui.detail].forEach(control => control.disabled = !enabled);
    ui.maskToggle.disabled = !enabled;
    ui.maskReset.disabled = !enabled;
    ui.exportBtn.disabled = !enabled;
    ui.exportSheetBtn.disabled = !enabled;
}

function loadImage(url, revokeAfterLoad = false) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => { if (revokeAfterLoad) URL.revokeObjectURL(url); resolve(image); };
        image.onerror = () => { if (revokeAfterLoad) URL.revokeObjectURL(url); reject(new Error("图片解码失败")); };
        image.src = url;
    });
}

async function acceptImage(image, name) {
    state.image = image;
    state.fileName = (name || "miniature").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]+/g, "-") || "miniature";
    ui.cropZoom.value = "100"; ui.cropX.value = "50"; ui.cropY.value = "50";
    ui.imageMeta.textContent = image.naturalWidth + " × " + image.naturalHeight;
    ui.empty.hidden = true;
    ui.shell.classList.add("ready");
    setImageControls(true);
    updateReadouts();
    await rebuildPreview();
}

ui.upload.addEventListener("change", async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setStatus("请选择 JPEG、PNG 或 WebP 图片", "error"); return; }
    if (file.size > 40 * 1024 * 1024) { setStatus("图片超过 40 MB，请先压缩", "error"); return; }
    setStatus("正在读取照片…", "busy");
    try { await acceptImage(await loadImage(URL.createObjectURL(file), true), file.name); }
    catch (error) { setStatus(error.message || "无法读取图片", "error"); }
    finally { ui.upload.value = ""; }
});

ui.sampleBtn.addEventListener("click", async () => {
    setStatus("正在载入示例…", "busy");
    try { await acceptImage(await loadImage("test1rat.jpg"), "skaven-example"); }
    catch { setStatus("找不到同目录下的 test1rat.jpg", "error"); }
});

function cropRect(image) {
    const zoom = Number(ui.cropZoom.value) / 100;
    const width = image.naturalWidth / zoom;
    const height = image.naturalHeight / zoom;
    return {
        x: (image.naturalWidth - width) * (Number(ui.cropX.value) / 100),
        y: (image.naturalHeight - height) * (Number(ui.cropY.value) / 100),
        width, height
    };
}

function drawCroppedImage(canvas, maxDimension) {
    const crop = cropRect(state.image);
    const scale = Math.min(1, maxDimension / Math.max(crop.width, crop.height));
    canvas.width = Math.max(1, Math.round(crop.width * scale));
    canvas.height = Math.max(1, Math.round(crop.height * scale));
    const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(state.image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
    return context;
}

function resetMask(shouldRender = true) {
    if (!previewSource.width || !previewSource.height) return;
    maskCanvas.width = previewSource.width;
    maskCanvas.height = previewSource.height;
    const context = maskCanvas.getContext("2d", { alpha: false, willReadFrequently: true });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    cachedPreviewMaskPixels = null;
    if (shouldRender) scheduleRender();
}

function maskPixelsFor(width, height) {
    if (!maskCanvas.width || !maskCanvas.height) return null;
    if (width === maskCanvas.width && height === maskCanvas.height && cachedPreviewMaskPixels) {
        return cachedPreviewMaskPixels;
    }
    let canvas = maskCanvas;
    if (width !== maskCanvas.width || height !== maskCanvas.height) {
        canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
        context.imageSmoothingEnabled = true;
        context.drawImage(maskCanvas, 0, 0, width, height);
    }
    const pixels = canvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, width, height).data;
    if (width === maskCanvas.width && height === maskCanvas.height) cachedPreviewMaskPixels = pixels;
    return pixels;
}

function boxBlur(source, width, height, radius) {
    if (radius <= 0) return source.slice();
    const temp = new Float32Array(source.length);
    const output = new Float32Array(source.length);
    const span = radius * 2 + 1;
    for (let y = 0; y < height; y++) {
        const row = y * width;
        let sum = 0;
        for (let k = -radius; k <= radius; k++) sum += source[row + clamp(k, 0, width - 1)];
        for (let x = 0; x < width; x++) {
            temp[row + x] = sum / span;
            sum += source[row + clamp(x + radius + 1, 0, width - 1)] - source[row + clamp(x - radius, 0, width - 1)];
        }
    }
    for (let x = 0; x < width; x++) {
        let sum = 0;
        for (let k = -radius; k <= radius; k++) sum += temp[clamp(k, 0, height - 1) * width + x];
        for (let y = 0; y < height; y++) {
            output[y * width + x] = sum / span;
            sum += temp[clamp(y + radius + 1, 0, height - 1) * width + x] - temp[clamp(y - radius, 0, height - 1) * width + x];
        }
    }
    return output;
}

function makeSurface(canvas) {
    const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const count = canvas.width * canvas.height;
    const luminance = new Float32Array(count);
    for (let i = 0, p = 0; i < count; i++, p += 4) {
        luminance[i] = (pixels[p] * 0.2126 + pixels[p + 1] * 0.7152 + pixels[p + 2] * 0.0722) / 255;
    }
    // Estimate broad forms instead of treating every sharp photo edge as a ridge.
    // The radius scales with output size so preview and export keep the same look.
    const radiusScale = Math.max(canvas.width, canvas.height) / 1400;
    const radius = Math.max(2, Math.round((3 + Number(ui.detail.value) * 2) * radiusScale));
    const blurred = boxBlur(luminance, canvas.width, canvas.height, radius);
    const gradX = new Float32Array(count);
    const gradY = new Float32Array(count);
    for (let y = 0; y < canvas.height; y++) {
        const row = y * canvas.width;
        const up = Math.max(0, y - 1) * canvas.width;
        const down = Math.min(canvas.height - 1, y + 1) * canvas.width;
        for (let x = 0; x < canvas.width; x++) {
            const index = row + x;
            gradX[index] = blurred[row + Math.min(canvas.width - 1, x + 1)] - blurred[row + Math.max(0, x - 1)];
            gradY[index] = blurred[down + x] - blurred[up + x];
        }
    }
    return { width: canvas.width, height: canvas.height, imageData, luminance, blurred, gradX, gradY };
}

async function rebuildPreview() {
    if (!state.image) return;
    const token = ++state.buildToken;
    setStatus("正在分析形体…", "busy");
    await new Promise(resolve => requestAnimationFrame(resolve));
    drawCroppedImage(previewSource, 1400);
    resetMask(false);
    const surface = makeSurface(previewSource);
    if (token !== state.buildToken) return;
    state.surface = surface;
    previewResult.width = surface.width;
    previewResult.height = surface.height;
    ui.view.width = surface.width;
    ui.view.height = surface.height;
    renderPreview();
    setStatus("预览就绪");
}

function lightingValues(surface) {
    const count = surface.width * surface.height;
    const values = new Float32Array(count);
    const relief = 2 + Number(ui.relief.value) / 100 * 10;
    const intensity = Number(ui.intensity.value) / 100;
    const ambient = Number(ui.ambient.value) / 100;
    const contrast = Number(ui.contrast.value) / 100;
    let lx = state.lightX;
    let ly = state.lightY;
    const radial = Math.min(.98, Math.hypot(lx, ly));
    let lz = Math.sqrt(Math.max(.04, 1 - radial * radial));
    const lightLength = Math.hypot(lx, ly, lz) || 1;
    lx /= lightLength; ly /= lightLength; lz /= lightLength;
    for (let i = 0; i < count; i++) {
        let nx = -surface.gradX[i] * relief;
        let ny = -surface.gradY[i] * relief;
        let nz = 1;
        const normalLength = Math.hypot(nx, ny, nz) || 1;
        nx /= normalLength; ny /= normalLength; nz /= normalLength;
        const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz);
        const illumination = clamp(ambient + diffuse * intensity);
        const base = surface.luminance[i];
        // Preserve the photograph's full-resolution form, then bend it toward
        // the simulated light. This avoids the embossed double-edge produced
        // by replacing the source with a gradient-only lighting image.
        let value = clamp(base * (.78 + illumination * .32) + (illumination - .5) * .08);
        const contrastCurve = value * value * (3 - 2 * value);
        value += (contrastCurve - value) * contrast * .7;
        values[i] = clamp(value);
    }
    return values;
}

function renderSurface(surface, targetCanvas, maskPixels = null) {
    const values = lightingValues(surface);
    const highlightRange = state.mode === "prep" ? prepHighlightRange(values, maskPixels) : null;
    const output = new ImageData(surface.width, surface.height);
    const out = output.data;
    const src = surface.imageData.data;
    const levels = Number(ui.levels.value);
    const shadow = hexRgb(ui.shadowColor.value);
    const middle = hexRgb(ui.midColor.value);
    const highlight = hexRgb(ui.highlightColor.value);
    const prepPalette = (prepPalettes[ui.prepPreset.value] || prepPalettes.gray).map(hexRgb);
    const levelMap = state.mode === "bands" || state.mode === "contour" ? new Uint8Array(values.length) : null;
    if (levelMap) for (let i = 0; i < values.length; i++) levelMap[i] = Math.round(values[i] * (levels - 1));

    for (let i = 0, p = 0; i < values.length; i++, p += 4) {
        if (maskPixels && maskPixels[p] < 128) {
            const muted = (src[p] * .2126 + src[p + 1] * .7152 + src[p + 2] * .0722) * .16;
            out[p] = muted; out[p + 1] = muted; out[p + 2] = muted;
        } else if (state.mode === "soft") {
            const sourceLum = src[p] * .2126 + src[p + 1] * .7152 + src[p + 2] * .0722;
            const factor = clamp((values[i] + .08) / (sourceLum / 255 + .08), .72, 1.38);
            out[p] = clamp((sourceLum + (src[p] - sourceLum) * 1.03) * factor, 0, 255);
            out[p + 1] = clamp((sourceLum + (src[p + 1] - sourceLum) * 1.03) * factor, 0, 255);
            out[p + 2] = clamp((sourceLum + (src[p + 2] - sourceLum) * 1.03) * factor, 0, 255);
        } else if (state.mode === "value") {
            const gray = Math.round(values[i] * 255);
            out[p] = gray; out[p + 1] = gray; out[p + 2] = gray;
        } else if (state.mode === "prep") {
            const localRise = clamp(.5 + (surface.luminance[i] - surface.blurred[i]) * 7);
            const highlightGuide = clamp((values[i] - highlightRange[0]) / Math.max(.04, highlightRange[1] - highlightRange[0]));
            // Keep the resolved form detail intact. Paintability comes from the
            // limited coverage bands in prepPixel, not from blurring the model.
            const color = prepPixel(values[i], localRise, ui.prepTechnique.value, state.prepStep, prepPalette, Number(ui.prepRange.value) / 100, highlightGuide);
            out[p] = color[0]; out[p + 1] = color[1]; out[p + 2] = color[2];
        } else {
            const stepped = levelMap ? levelMap[i] / (levels - 1) : values[i];
            const color = paletteColor(stepped, shadow, middle, highlight);
            out[p] = color[0]; out[p + 1] = color[1]; out[p + 2] = color[2];
        }
        out[p + 3] = 255;
    }

    if (state.mode === "contour") {
        const width = surface.width;
        const height = surface.height;
        for (let y = 0; y < height - 1; y++) {
            for (let x = 0; x < width - 1; x++) {
                const i = y * width + x;
                if (levelMap[i] !== levelMap[i + 1] || levelMap[i] !== levelMap[i + width]) {
                    const p = i * 4;
                    out[p] = 8; out[p + 1] = 10; out[p + 2] = 10;
                }
            }
        }
    }
    targetCanvas.width = surface.width;
    targetCanvas.height = surface.height;
    targetCanvas.getContext("2d", { alpha: false }).putImageData(output, 0, 0);
    return targetCanvas;
}

function renderMaskedSource(surface, targetCanvas, maskPixels) {
    targetCanvas.width = surface.width;
    targetCanvas.height = surface.height;
    const output = new ImageData(new Uint8ClampedArray(surface.imageData.data), surface.width, surface.height);
    if (maskPixels) {
        for (let p = 0; p < output.data.length; p += 4) {
            if (maskPixels[p] >= 128) continue;
            const muted = (output.data[p] * .2126 + output.data[p + 1] * .7152 + output.data[p + 2] * .0722) * .16;
            output.data[p] = muted; output.data[p + 1] = muted; output.data[p + 2] = muted;
        }
    }
    targetCanvas.getContext("2d", { alpha: false }).putImageData(output, 0, 0);
    return targetCanvas;
}

function scheduleRender() {
    if (state.renderFrame) cancelAnimationFrame(state.renderFrame);
    state.renderFrame = requestAnimationFrame(() => { state.renderFrame = 0; renderPreview(); });
}

function scheduleMaskPreview() {
    if (state.renderFrame) cancelAnimationFrame(state.renderFrame);
    state.renderFrame = requestAnimationFrame(() => { state.renderFrame = 0; drawComparison(); });
}

function renderPreview() {
    if (!state.surface) return;
    renderSurface(state.surface, previewResult, maskPixelsFor(state.surface.width, state.surface.height));
    drawComparison();
    updateReadouts();
}

function drawComparison() {
    if (!state.surface) return;
    const splitRatio = Number(ui.compare.value) / 100;
    viewCtx.clearRect(0, 0, ui.view.width, ui.view.height);
    if (state.maskMode) {
        viewCtx.drawImage(previewSource, 0, 0);
        viewCtx.save();
        viewCtx.globalCompositeOperation = "multiply";
        viewCtx.globalAlpha = .82;
        viewCtx.drawImage(maskCanvas, 0, 0);
        viewCtx.restore();
        ui.compareLine.style.display = "none";
        return;
    }
    viewCtx.drawImage(previewResult, 0, 0);
    if (splitRatio > 0) {
        const split = Math.round(ui.view.width * splitRatio);
        viewCtx.save();
        viewCtx.beginPath(); viewCtx.rect(0, 0, split, ui.view.height); viewCtx.clip();
        viewCtx.drawImage(previewSource, 0, 0); viewCtx.restore();
        ui.compareLine.style.display = "block";
        ui.compareLine.style.left = splitRatio * 100 + "%";
    } else ui.compareLine.style.display = "none";
}

function scheduleSurfaceRebuild() {
    clearTimeout(state.cropTimer);
    state.cropTimer = setTimeout(rebuildPreview, 90);
}

[ui.cropZoom, ui.cropX, ui.cropY, ui.detail].forEach(control => control.addEventListener("input", () => { updateReadouts(); scheduleSurfaceRebuild(); }));
[ui.intensity, ui.ambient, ui.relief, ui.contrast, ui.levels].forEach(control => control.addEventListener("input", scheduleRender));
[ui.shadowColor, ui.midColor, ui.highlightColor].forEach(control => control.addEventListener("input", scheduleRender));
ui.paintSearch.addEventListener("input", event => renderPaintResults(event.target.value));
ui.paintSearch.addEventListener("focus", event => renderPaintResults(event.target.value));
ui.paintSearch.addEventListener("keydown", event => {
    if (event.key === "Escape") ui.paintResults.hidden = true;
});
ui.compare.addEventListener("input", () => { updateReadouts(); drawComparison(); });

document.querySelectorAll(".lab-mode-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".lab-mode-btn").forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });
        state.mode = button.dataset.mode;
        ui.prepPanel.hidden = state.mode !== "prep";
        updateReadouts();
        scheduleRender();
    });
});

function updatePrepInstruction() {
    ui.prepInstruction.textContent = prepInstructions[state.prepStep] + " " + prepTechniqueNotes[ui.prepTechnique.value];
}

ui.prepPreset.addEventListener("change", scheduleRender);
ui.prepTechnique.addEventListener("change", () => { updatePrepInstruction(); scheduleRender(); });
ui.prepRange.addEventListener("input", () => { updateReadouts(); scheduleRender(); });
document.querySelectorAll("[data-prep-step]").forEach(button => {
    button.addEventListener("click", () => {
        state.prepStep = Number(button.dataset.prepStep);
        document.querySelectorAll("[data-prep-step]").forEach(item => item.classList.toggle("active", item === button));
        updatePrepInstruction();
        updateReadouts();
        scheduleRender();
    });
});

function updateLightUi() {
    const radius = ui.lightPad.clientWidth / 2;
    ui.lightDot.style.left = radius + state.lightX * radius + "px";
    ui.lightDot.style.top = radius + state.lightY * radius + "px";
    const angle = (Math.atan2(state.lightY, state.lightX) * 180 / Math.PI + 360) % 360;
    const names = ["右", "右下", "下", "左下", "左", "左上", "上", "右上"];
    const direction = names[Math.round(angle / 45) % 8];
    const distance = Math.hypot(state.lightX, state.lightY);
    const elevation = distance < .38 ? "高角度" : distance < .72 ? "中角度" : "低角度";
    ui.lightValue.textContent = direction + " · " + elevation;
    ui.lightPad.setAttribute("aria-valuenow", String(Math.round(angle)));
    ui.lightPad.setAttribute("aria-valuetext", direction + "，" + elevation);
}

function setLightFromPointer(event) {
    const rect = ui.lightPad.getBoundingClientRect();
    let x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    let y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const length = Math.hypot(x, y);
    if (length > .95) { x = x / length * .95; y = y / length * .95; }
    state.lightX = x; state.lightY = y;
    updateLightUi(); scheduleRender();
}

ui.lightPad.addEventListener("pointerdown", event => { state.lightDragging = true; ui.lightPad.setPointerCapture(event.pointerId); setLightFromPointer(event); });
ui.lightPad.addEventListener("pointermove", event => { if (state.lightDragging) setLightFromPointer(event); });
ui.lightPad.addEventListener("pointerup", () => state.lightDragging = false);
ui.lightPad.addEventListener("pointercancel", () => state.lightDragging = false);
ui.lightPad.addEventListener("keydown", event => {
    const step = event.shiftKey ? .1 : .025;
    const vectors = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (!vectors[event.key]) return;
    event.preventDefault();
    state.lightX += vectors[event.key][0]; state.lightY += vectors[event.key][1];
    const length = Math.hypot(state.lightX, state.lightY);
    if (length > .95) { state.lightX = state.lightX / length * .95; state.lightY = state.lightY / length * .95; }
    updateLightUi(); scheduleRender();
});

function setCompareFromPointer(event) {
    const rect = ui.view.getBoundingClientRect();
    ui.compare.value = String(Math.round(clamp((event.clientX - rect.left) / rect.width) * 100));
    updateReadouts(); drawComparison();
}

function maskPoint(event) {
    const rect = ui.view.getBoundingClientRect();
    return {
        x: clamp((event.clientX - rect.left) / rect.width) * maskCanvas.width,
        y: clamp((event.clientY - rect.top) / rect.height) * maskCanvas.height
    };
}

function paintMask(event) {
    const point = maskPoint(event);
    const previous = state.maskLastPoint || point;
    const context = maskCanvas.getContext("2d", { alpha: false });
    const radius = Math.min(maskCanvas.width, maskCanvas.height) * Number(ui.brushSize.value) / 100;
    context.strokeStyle = state.maskAction === "remove" ? "#000000" : "#ffffff";
    context.lineWidth = radius * 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(previous.x, previous.y);
    context.lineTo(point.x + .01, point.y + .01);
    context.stroke();
    cachedPreviewMaskPixels = null;
    state.maskLastPoint = point;
    scheduleMaskPreview();
}

ui.maskToggle.addEventListener("click", () => {
    state.maskMode = !state.maskMode;
    ui.maskTools.hidden = !state.maskMode;
    ui.maskToggle.textContent = state.maskMode ? "完成蒙版编辑" : "编辑主体蒙版";
    ui.shell.classList.toggle("masking", state.maskMode);
    ui.compare.disabled = state.maskMode;
    if (state.maskMode) {
        ui.compare.value = "0";
        updateReadouts();
        setStatus("蒙版编辑：擦除不参与计算的背景", "busy");
        drawComparison();
    } else {
        setStatus("主体蒙版已应用");
        scheduleRender();
    }
});

ui.maskReset.addEventListener("click", () => {
    resetMask();
    setStatus("主体蒙版已重置");
});

document.querySelectorAll("[data-mask-action]").forEach(button => {
    button.addEventListener("click", () => {
        state.maskAction = button.dataset.maskAction;
        document.querySelectorAll("[data-mask-action]").forEach(item => {
            const active = item === button;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", String(active));
        });
    });
});

ui.brushSize.addEventListener("input", updateReadouts);

ui.view.addEventListener("pointerdown", event => {
    if (state.maskMode) {
        state.maskDragging = true;
        state.maskLastPoint = null;
        ui.view.setPointerCapture(event.pointerId);
        paintMask(event);
        return;
    }
    if (Number(ui.compare.value) === 0) return;
    state.compareDragging = true; ui.view.setPointerCapture(event.pointerId); setCompareFromPointer(event);
});
ui.view.addEventListener("pointermove", event => {
    if (state.maskDragging) paintMask(event);
    else if (state.compareDragging) setCompareFromPointer(event);
});
ui.view.addEventListener("pointerup", () => {
    state.maskDragging = false; state.compareDragging = false; state.maskLastPoint = null;
});
ui.view.addEventListener("pointercancel", () => {
    state.maskDragging = false; state.compareDragging = false; state.maskLastPoint = null;
});

function canvasBlob(canvas) {
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("浏览器无法生成 PNG")), "image/png"));
}

async function downloadCanvas(canvas, fileName) {
    const blob = await canvasBlob(canvas);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

ui.exportSheetBtn.addEventListener("click", async () => {
    if (!state.image || ui.exportSheetBtn.disabled) return;
    ui.exportSheetBtn.disabled = true;
    setStatus("正在生成四格施工单…", "busy");
    const previousMode = state.mode;
    const previousStep = state.prepStep;
    try {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const source = document.createElement("canvas");
        drawCroppedImage(source, 1200);
        const surface = makeSurface(source);
        const maskPixels = maskPixelsFor(surface.width, surface.height);
        const panels = [renderMaskedSource(surface, document.createElement("canvas"), maskPixels)];
        state.mode = "prep";
        for (let step = 0; step < 3; step++) {
            state.prepStep = step;
            panels.push(renderSurface(surface, document.createElement("canvas"), maskPixels));
        }
        const margin = 36, gap = 24, header = 126, label = 50;
        const sheet = document.createElement("canvas");
        sheet.width = margin * 2 + panels[0].width * 2 + gap;
        sheet.height = header + margin + (panels[0].height + label) * 2 + gap;
        const context = sheet.getContext("2d", { alpha: false });
        context.fillStyle = "#101313";
        context.fillRect(0, 0, sheet.width, sheet.height);
        context.fillStyle = "#f0f1ec";
        context.font = '700 32px system-ui, "Microsoft YaHei", sans-serif';
        context.fillText("MINIATURE LIGHT LAB · 三步施工单", margin, 48);
        context.fillStyle = "#aeb5a4";
        context.font = '500 20px system-ui, "Microsoft YaHei", sans-serif';
        const preset = ui.prepPreset.selectedOptions[0].textContent;
        const technique = ui.prepTechnique.selectedOptions[0].textContent;
        context.fillText(`${preset} · ${technique} · 亮面范围 ${ui.prepRange.value}% · 主光 ${ui.lightValue.textContent}`, margin, 84);
        const labels = ["原图 / 取景", "1 · 阴影块", "2 · 主亮面", "3 · 边缘点亮"];
        panels.forEach((panel, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = margin + column * (panel.width + gap);
            const y = header + row * (panel.height + label + gap);
            context.drawImage(panel, x, y);
            context.fillStyle = "#d8ff62";
            context.font = '650 22px system-ui, "Microsoft YaHei", sans-serif';
            context.fillText(labels[index], x, y + panel.height + 32);
        });
        await downloadCanvas(sheet, state.fileName + "-prep-contact-sheet.png");
        setStatus("已导出四格施工单 " + sheet.width + " × " + sheet.height);
    } catch (error) {
        setStatus(error.message || "施工单导出失败", "error");
    } finally {
        state.mode = previousMode;
        state.prepStep = previousStep;
        ui.exportSheetBtn.disabled = false;
    }
});

ui.exportBtn.addEventListener("click", async () => {
    if (!state.image || ui.exportBtn.disabled) return;
    ui.exportBtn.disabled = true;
    setStatus("正在生成高分辨率参考…", "busy");
    try {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const exportSource = document.createElement("canvas");
        drawCroppedImage(exportSource, 3000);
        const exportSurface = makeSurface(exportSource);
        const exportCanvas = document.createElement("canvas");
        renderSurface(exportSurface, exportCanvas, maskPixelsFor(exportSurface.width, exportSurface.height));
        const exportMode = state.mode === "prep"
            ? `prep-${ui.prepPreset.value}-step-${state.prepStep + 1}`
            : state.mode;
        await downloadCanvas(exportCanvas, state.fileName + "-" + exportMode + "-reference.png");
        setStatus("已导出 " + exportCanvas.width + " × " + exportCanvas.height);
    } catch (error) { setStatus(error.message || "导出失败", "error"); }
    finally { ui.exportBtn.disabled = false; }
});

window.addEventListener("resize", updateLightUi);
if (!paintCatalog.length) {
    ui.paintSearch.disabled = true;
    ui.paintSearch.placeholder = "漆表加载失败；仍可手动选择颜色";
}
updateReadouts();
updatePrepInstruction();
updateLightUi();
