import { rgb } from 'd3-color';
import { RenderModel } from './renderModel';
import { LineChartRenderer } from './lineChartRenderer';
import { CanvasLayer } from './canvasLayer';
import { SVGLayer } from './svgLayer';
const defaultOptions = {
    lineWidth: 1,
    backgroundColor: rgb(255, 255, 255, 1),
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 45,
    paddingBottom: 20,
    xRange: 'auto',
    yRange: 'auto',
    realTime: false,
    zoom: true,
    baseTime: 0,
};
const defaultSeriesOptions = {
    color: rgb(0, 0, 0, 1),
    name: '',
};
export default class TimeChart {
    constructor(el, options) {
        var _a, _b, _c;
        this.el = el;
        const series = (_c = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.series) === null || _b === void 0 ? void 0 : _b.map(s => (Object.assign(Object.assign({ data: [] }, defaultSeriesOptions), s))), (_c !== null && _c !== void 0 ? _c : []));
        const resolvedOptions = Object.assign(Object.assign(Object.assign({}, defaultOptions), options), { series });
        this.options = resolvedOptions;
        this.renderModel = new RenderModel(resolvedOptions);
        this.canvasLayer = new CanvasLayer(el, resolvedOptions, this.renderModel);
        this.svgLayer = new SVGLayer(el, resolvedOptions, this.renderModel);
        this.lineChartRenderer = new LineChartRenderer(this.renderModel, this.canvasLayer.gl, resolvedOptions);
        this.onResize();
        window.addEventListener('resize', () => this.onResize());
    }
    onResize() {
        const canvas = this.canvasLayer.canvas;
        this.renderModel.resize(canvas.clientWidth, canvas.clientHeight);
        this.svgLayer.onResize();
        this.canvasLayer.onResize();
        this.lineChartRenderer.onResize(canvas.clientWidth, canvas.clientHeight);
        this.update();
    }
    update() {
        this.renderModel.requestRedraw();
    }
}
//# sourceMappingURL=index.js.map