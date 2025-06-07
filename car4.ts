//% color=#007F00 icon="\uf0d1" block="CaR" weight=91

namespace car {

    //export const pinRelay = DigitalPin.P0          // 5V Grove Relay
    const pinFototransistor = AnalogPin.P1  // GND fischertechnik 36134 Fototransistor
    //export const pinEncoder = DigitalPin.P2        // 5V fischertechnik 186175 Encodermotor Competition
    const pinBuzzer = DigitalPin.P3         // 5V Grove Buzzer
    //export const pinServo = AnalogPin.C4           // 5V fischertechnik 132292 Servo
    //const pin5 = DigitalPin.C5              // Draht blau
    //const pin6 = DigitalPin.C6              // Draht gelb
    const pinLicht = DigitalPin.C7          // 5V Licht
    //export const pinUltraschall = DigitalPin.C8    // 5V Grove Ultrasonic
    //export const pinSpurrechts = DigitalPin.C9     // 9V fischertechnik 128598 IR-Spursensor
    //const pin10 = DigitalPin.C10
    //export const pinSpurlinks = DigitalPin.C11     // 9V fischertechnik 128598 IR-Spursensor




    let n_Licht = false
    let n_buzzer = false



    //% group="Hupe" subcategory="Aktoren"
    //% block="Hupe %pON"
    //% pON.shadow="toggleOnOff"
    export function buzzer(pON: boolean) {
        if (n_buzzer !== pON) {
            n_buzzer = pON
            pins.digitalWritePin(pinBuzzer, n_buzzer ? 1 : 0)
        }
    }



    //% group="Licht" subcategory="Aktoren"
    //% block="Licht %pON || blinken %pBlink" weight=6
    //% pON.shadow="toggleOnOff" pBlink.shadow="toggleOnOff"
    export function licht(pON: boolean, pBlink = false) {
        if (pON && pBlink)
            n_Licht = !n_Licht
        else
            n_Licht = pON
        pins.digitalWritePin(pinLicht, n_Licht ? 0 : 1) // an bei digitalem Wert 0
    }

    //% group="Licht" subcategory="Aktoren"
    //% block="Licht an ?" weight=4
    export function licht_get() { return n_Licht }

    //% group="Licht" subcategory="Aktoren"
    //% block="Licht aus < %aus an > %an bei Helligkeit" weight=2
    //% aus.defl=200 an.defl=300
    export function licht_sensor(aus: number, an: number) {
        if (n_Licht && helligkeit_analog() < aus) {
            licht(false)
        } else if (!n_Licht && helligkeit_analog() > an) {
            licht(true)
        }
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