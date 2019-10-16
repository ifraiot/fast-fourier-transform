 import fft from './src/lib/fourier-transform/fastFourierTransform.js';
 import ComplexNumber from '../src/lib/complex-number/ComplexNumber.js'


 exports.functionFFT = function (input) {
     const dataComplexNumber = ConvertToComplexNumber(input);
     // compute FFT
     const output_FFT = fft(dataComplexNumber);
     const [Vreal, Vimag] = ConvertToFFT_Xreal_Ximag(output_FFT);
     const dataMagnitude  = ComputeMagnitude(Vreal, Vimag , 2048 );
     const dataFrequency  = ComputeFrequency(6000, 2048);
    // return data
     const Data = [];
     for (let i = 0; i < 1009; i++) {
         Data.push('{ Magnitude : ' + dataMagnitude[i] + ',' + 'Frequency : ' + dataFrequency[i] + '}')
     }
     return Data;
 }


 function ConvertToComplexNumber(input_array) {
     if (input_array.length) {
         const inputsComplexNumber = [];
         for (let i = 0; i < input_array.length; i++) {
             inputsComplexNumber.push(
                 new ComplexNumber({
                     re: data_Ampi[i],
                     im: 0
                 }))
         };
         return inputsComplexNumber;
     } else {
         throw "input is not array"
     }
 }

 function ConvertToFFT_Xreal_Ximag(inputFFT) {
     if (inputFFT.length) {
         const Xreal = [];
         const Ximag = [];
         for (let i = 0; i < inputFFT.length; i++) {
             Xreal.push(inputFFT[i].re);
             Ximag.push(inputFFT[i].im);
         }
         return Xreal, Ximag
     } else {
         throw "input is not array"
     }
 }

 function ComputeMagnitude(Xreal, Ximag, sampling) {
     const magni = [];
     for (let i = 0; i < sampling; i++) {
         magni.push(Math.sqrt((Xreal[i] * Xreal[i]) + (Ximag[i] * Ximag[i])));
     }
     return magni;
 }

 function ComputeFrequency(samplingFreq, sampling) {
     const Freq = [];
     for (let i = 0; i < 1009; i++) {
         Freq.push((i * 1.0 * samplingFreq) / sampling)
     }
     return Freq;
 }
