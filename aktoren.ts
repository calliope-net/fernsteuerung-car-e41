
namespace car { // aktoren.ts

    const pinBuzzer = DigitalPin.P3         // 5V Grove Buzzer
    const pinLicht = DigitalPin.C7          // 5V Licht

    let n_Licht = false
    let n_buzzer = false


    //% group="Hupe"
    //% block="Hupe %pON"
    //% pON.shadow="toggleOnOff"
    export function buzzer(pON: boolean) {
        if (n_buzzer !== pON) {
            n_buzzer = pON
            pins.digitalWritePin(pinBuzzer, n_buzzer ? 1 : 0)
        }
    }



    //% group="Licht"
    //% block="Licht %pON || blinken %pBlink" weight=6
    //% pON.shadow="toggleOnOff" pBlink.shadow="toggleOnOff"
    export function licht(pON: boolean, pBlink = false) {
        if (pON && pBlink)
            n_Licht = !n_Licht
        else
            n_Licht = pON
        pins.digitalWritePin(pinLicht, n_Licht ? 0 : 1) // an bei digitalem Wert 0
    }

    //% group="Licht"
    //% block="Licht an ?" weight=4
    export function licht_get() { return n_Licht }

    //% group="Licht"
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

    const pinFototransistor = AnalogPin.P1  // GND fischertechnik 36134 Fototransistor

    //% group="Helligkeit"
    //% block="Helligkeit analog P1" weight=6
    export function helligkeit_analog() { return pins.analogReadPin(pinFototransistor) }

    // group="Helligkeit" subcategory="Sensoren"
    // block="Helligkeit %pVergleich %analog" weight=8
    /*  export function helligkeit_vergleich(pVergleich: eVergleich, analog: number) {
         switch (pVergleich) {
             case eVergleich.gt: return helligkeit_analog() >= analog
             case eVergleich.lt: return helligkeit_analog() <= analog
             default: return false
         }
     } */

} // aktoren.ts
