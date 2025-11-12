if (!navigator.gpu) {
	throw Error("WebGPU not supported.");
}

/** @type {GPUAdapter} */
export const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
	throw Error("Couldn't request WebGPU adapter.");
}

/** @type {GPUDevice} */
export const device = await adapter.requestDevice();
