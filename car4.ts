//% color=#007F00 icon="\uf0d1" block="CaR" weight=91

namespace car {

    //export const pinRelay = DigitalPin.P0          // 5V Grove Relay
    const pinFototransistor = AnalogPin.P1  // GND fischertechnik 36134 Fototransistor
    //export const pinEncoder = DigitalPin.P2        // 5V fischertechnik 186175 Encodermotor Competition
    //const pinBuzzer = DigitalPin.P3         // 5V Grove Buzzer
    //export const pinServo = AnalogPin.C4           // 5V fischertechnik 132292 Servo
    //const pin5 = DigitalPin.C5              // Draht blau
    //const pin6 = DigitalPin.C6              // Draht gelb
    //const pinLicht = DigitalPin.C7          // 5V Licht
    //export const pinUltraschall = DigitalPin.C8    // 5V Grove Ultrasonic
    //export const pinSpurrechts = DigitalPin.C9     // 9V fischertechnik 128598 IR-Spursensor
    //const pin10 = DigitalPin.C10
    //export const pinSpurlinks = DigitalPin.C11     // 9V fischertechnik 128598 IR-Spursensor




    // ========== group="Helligkeit" subcategory="Sensoren"

    //% group="Helligkeit" subcategory="Sensoren"
    //% block="Helligkeit %pVergleich %analog" weight=8
    /*  export function helligkeit_vergleich(pVergleich: eVergleich, analog: number) {
         switch (pVergleich) {
             case eVergleich.gt: return helligkeit_analog() >= analog
             case eVergleich.lt: return helligkeit_analog() <= analog
             default: return false
         }
     } */

    //% group="Helligkeit" subcategory="Sensoren"
    //% block="Helligkeit analog" weight=6
    export function helligkeit_analog() { return pins.analogReadPin(pinFototransistor) }


}