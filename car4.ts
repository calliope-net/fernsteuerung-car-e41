//% color=#007F00 icon="\uf0d1" block="CaR" weight=91

namespace car { // car4.ts

    //export const pinRelay = DigitalPin.P0          // 5V Grove Relay
    //const pinFototransistor = AnalogPin.P1  // GND fischertechnik 36134 Fototransistor
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

  
    //% group="Text"
    //% block="Statuszeile 0..11" weight=7
    export function statuszeile0() {
        return format(receiver.selectMotorSpeed(), 3, eAlign.right) +
            format(receiver.pinServoWinkel(), 3, eAlign.right) +
            format(receiver.encoderCounterM0(), 5, eAlign.right) + ' '
    }

    //% group="Text"
    //% block="Statuszeile 4..7" weight=6
    export function statuszeile1() {
        let receivedBuffer: Buffer = btf.btf_receivedBuffer19()
        let qm = receiver.qwiicMotorChipStatus(receiver.eQwiicMotorChip.ab)
        if (receivedBuffer) {
            let ba = receivedBuffer[0] >> 4 & 0x03 // Betriebsart 0..3
            return " " + ba.toString() + qm.toString() + " "
        }
        else
            return "  " + qm.toString() + " "
    }

    //% group="Text"
    //% block="format %pText || Länge %len %pAlign" weight=3
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

} // car4.ts
