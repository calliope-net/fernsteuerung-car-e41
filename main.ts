function macheEtwas () {
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 2, receiver.selectMotorSpeed(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 4, 5, receiver.pinServoWinkel(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 11, 15, receiver.encoderCounterM0(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 8, 11, lcd20x4.lcd20x4_text("" + car.wattmeterV(1) + "V"), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 12, 15, car.wattmetermA(), lcd20x4.eAlign.right)
}
receiver.onEncoderEvent(function (fahren, lenken, array) {
    receiver.selectMotor128Servo16(fahren, lenken)
})
function zeigeStatus (zeigeAbstand: boolean) {
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 11, car.statuszeile0())
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 8, 15, car.statuszeilew())
    if (zeigeAbstand) {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 0, 3, receiver.selectAbstand_cm(false), lcd20x4.eAlign.right)
    } else {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 0, 3, lcd20x4.lcd20x4_text("aus"))
    }
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    receiver.pinRelay(false)
})
receiver.onAbstandEvent(function (abstand_Sensor, abstand_Stop, cm) {
    receiver.buffer_Hindernis_ausweichen(btf.btf_receivedBuffer19(), abstand_Stop)
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
        car.buzzer(false)
    }
    receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, true)
    receiver.fahreJoystick(btf.btf_receivedBuffer19())
    car.buzzer(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    zeigeStatus(btf.getSensor(receivedData, btf.eBufferPointer.m0, btf.eSensor.b6Abstand))
    car.licht_sensor(200, 300)
})
if (!(btf.simulator())) {
    led.enable(false)
    lcd20x4.initLCD(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 4, lcd20x4.lcd20x4_text("CaR 4"))
    receiver.beimStart(
    receiver.eHardware.car4,
    90,
    true,
    65,
    false
    )
    for (let Index = 0; Index <= 6; Index++) {
        if (receiver.qwiicMotorStatus(receiver.eQwiicMotorChip.ab)) {
            break;
        } else {
            lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 7, 7, Index)
            basic.pause(1000)
        }
    }
    if (car.wattmeterReset(4096) && car.wattmeterakkuleer()) {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 12, 15, lcd20x4.lcd20x4_text("Akku"))
    }
}
basic.forever(function () {
    receiver.buffer_raiseEncoderEvent(btf.btf_receivedBuffer19(), btf.btf_RadioPacketTime())
    receiver.buffer_raiseAbstandMotorStop(btf.btf_receivedBuffer19())
    receiver.buffer_raiseAbstandEvent(btf.btf_receivedBuffer19())
})
loops.everyInterval(700, function () {
    if (btf.timeout(45000)) {
        btf.comment(btf.btf_text("immer: nach 45s aus"))
        receiver.pinRelay(false)
    } else if (btf.timeoutReceivedBuffer(btf.e0Betriebsart.p0Fahren, 20000)) {
        btf.comment(btf.btf_text("Fahren und Lenken: nach 20s aus"))
        receiver.pinRelay(false)
    } else if (btf.timeoutReceivedBuffer(btf.e0Betriebsart.p0Fahren, 1000)) {
        btf.comment(btf.btf_text("Fahren und Lenken: nach 1s keine Bluetooth Daten empfangen"))
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        car.buzzer(false)
        car.licht(true, true)
        zeigeStatus(true)
    } else if (btf.timeoutReceivedBuffer(btf.e0Betriebsart.p1Lokal, 20000)) {
        btf.comment(btf.btf_text("Sensoren: nach 20s aus"))
        receiver.pinRelay(false)
    } else if (btf.timeoutReceivedBuffer(btf.e0Betriebsart.p2Fahrplan, 60000)) {
        btf.comment(btf.btf_text("Fahrplan: nach 60s Stop"))
        receiver.selectMotorStop()
    } else if (btf.timeout(2000)) {
        car.licht(true, true)
        zeigeStatus(true)
    }
})
