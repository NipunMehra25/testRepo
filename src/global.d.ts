export { }

declare module '*.glb'
declare module '*.png'

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: {
        color?: string
        depthTest?: boolean
        resolution?: [number, number]
        useMap?: boolean
        map?: any
        repeat?: [number, number]
        lineWidth?: number
        [key: string]: any
      }
    }
  }
}
