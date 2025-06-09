
namespace car { // wattmeter.ts

    // I²C Adresse Wattmeter Modul
    const i2cWattmeter = 0x45
    // Register
    enum eRegister {
        REG_CONFIG = 0x00,          // Config register
        //REG_SHUNTVOLTAGE = 0x01,    // Shunt Voltage Register
        REG_BUSVOLTAGE = 0x02,      // Bus Voltage Register
        //REG_POWER = 0x03,           // Power Register
        REG_CURRENT = 0x04,         // Current Register
        REG_CALIBRATION = 0x05      // Register Calibration
    }

    //% group="Wattmeter" subcategory="Sensoren"
    //% block="Wattmeter Reset || Calibration %calibration_value" weight=8
    //% calibration_value.defl=4096
    export function wattmeterReset(calibration_value?: number): boolean {
        if (write_register(eRegister.REG_CONFIG, 0x8000) == 0) // INA219_CONFIG_RESET
            return write_register(eRegister.REG_CALIBRATION, calibration_value) == 0
        else
            return false
    }

    //% group="Wattmeter" subcategory="Sensoren"
    //% block="Spannung U in V || Kommastellen %digits" weight=6
    //% digits.min=0 digits.max=2 digits.defl=1
    export function wattmeterV(digits = 1) { // get the BusVoltage （Voltage of IN- to GND)
        // die letzten 3 Bit 2-1-0 gehögen nicht zum Messwert | - | CNVR | OVF
        //return (read_Register_UInt16BE(pADDR, eRegister.REG_BUSVOLTAGE) >> 3) * 0.004    // cpp  0.004/8=0.0005
        return Math.roundWithPrecision((read_register(eRegister.REG_BUSVOLTAGE).getNumber(NumberFormat.UInt16BE, 0) >> 3) * 0.004, digits)
        //return (read_register(eRegister.REG_BUSVOLTAGE).getNumber(NumberFormat.UInt16BE, 0) >> 3) * 0.004    // cpp  0.004/8=0.0005
    }

    //% group="Wattmeter" subcategory="Sensoren"
    //% block="Strom I in mA" weight=5
    export function wattmetermA() { // get the Current(Current flows across IN+ and IN-)
        //return read_Register_mit_Vorzeichen_Int16BE(pADDR, eRegister.REG_CURRENT)
        return read_register(eRegister.REG_CURRENT).getNumber(NumberFormat.Int16BE, 0)
    }

    // group="Wattmeter" subcategory="Sensoren"
    // block="V und mA als Text (8)" weight=3
    //function wattmetertext() { return format(wattmeterV(1), 3, eAlign.right) + "V" + format(wattmetermA(), 4, eAlign.right) }

    //% group="Wattmeter" subcategory="Sensoren"
    //% block="Akku laden < 7V" weight=2
    export function wattmeterakkuleer() { // kleiner als 7.0 Volt
        read_register(eRegister.REG_BUSVOLTAGE) // einmal mehr lesen, Wert stimmt bei ersten Mal nicht
        return wattmeterV(1) < 7
    }

    //% group="Wattmeter" subcategory="Sensoren"
    //% block="Statuszeile Wattmeter 8..15" weight=1
    export function statuszeilew() {
        return format(wattmeterV(1), 3, eAlign.right) + "V" +
            format(wattmetermA(), 4, eAlign.right)
    }


    // ========== PRIVATE nur für wattmeter ==========

    function read_register(register: eRegister): Buffer { // return: Buffer
        pins.i2cWriteBuffer(i2cWattmeter, Buffer.fromArray([register]), true)
        return pins.i2cReadBuffer(i2cWattmeter, 2)
    }

    function write_register(register: eRegister, value: number) { // value: uint16_t
        let bu = Buffer.create(3)
        bu.setUint8(0, register)
        bu.setNumber(NumberFormat.UInt16BE, 1, value)
        return pins.i2cWriteBuffer(i2cWattmeter, bu)
    }
} // wattmeter.ts
