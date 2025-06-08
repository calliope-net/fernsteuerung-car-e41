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

   /*  function zeigeStatus() {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 2, receiver.selectMotorSpeed(), lcd20x4.eAlign.right)
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 4, 5, receiver.pinServoWinkel(), lcd20x4.eAlign.right)
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 11, 15, receiver.encoderCounterM0(), lcd20x4.eAlign.right)
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 8, 11, lcd20x4.lcd20x4_text("" + car.wattmeterV(1) + "V"), lcd20x4.eAlign.right)
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 12, 15, car.wattmetermA(), lcd20x4.eAlign.right)
    } */

    //% group="Text" advanced=true
    //% block="Statuszeile 0" weight=8
    export function statuszeile0() {
        return format(receiver.selectMotorSpeed(), 3, eAlign.right) +
            format(receiver.pinServoWinkel(), 3, eAlign.right) +
            format(receiver.encoderCounterM0(), 5, eAlign.right)
    }

    

    //% group="Text" advanced=true
    //% block="format %pText || Länge %len %pAlign" weight=7
    //% len.min=1 len.max=20 len.defl=4
    export function format(pText: any, len?: number, pAlign?: eAlign) {
        let text: string = convertToText(pText)
        if (text.length > len)
            text = text.substr(0, len)
        else if (text.length < len && pAlign == eAlign.right)
            text = "                    ".substr(0, len - text.length) + text
        else if (text.length < len)
            text = text + "                    ".substr(0, len - text.length)
        return text
    }


    // ========== ENUMs

    export enum eAlign {
        //% block="linksbündig"
        left,
        //% block="rechtsbündig"
        right
    }

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