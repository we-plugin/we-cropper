import {
  Wx
} from './wx'

export namespace Options {

  interface cutOption {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }

  interface ConstructorOption {
    id: string;
    width?: number;
    height?: number;
    scale?: number;
    src?: string;
    zoom?: number;
    cut?: cutOption;
    onReady?: (ctx: Wx.CanvasContext, instance: any) => void;
    onLoad?: (ctx: Wx.CanvasContext, instance: any) => void;
    onBeforeDraw?: (ctx: Wx.CanvasContext, instance: any) => void;
  }

}
