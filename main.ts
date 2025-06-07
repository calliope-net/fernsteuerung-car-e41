function zeigeStatus () {
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 2, receiver.selectMotorSpeed(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 4, 5, receiver.pinServoWinkel(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 11, 15, receiver.encoderCounterM0(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 8, 11, lcd20x4.lcd20x4_text("" + car.wattmeterV(1) + "V"), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 12, 15, car.wattmetermA(), lcd20x4.eAlign.right)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    receiver.pinRelay(false)
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
    }
    receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, btf.getaktiviert(receivedData, btf.e3aktiviert.m0))
    receiver.selectMotor128Servo16(btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b0_Motor), btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b1_Servo))
    car.buzzer(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    zeigeStatus()
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
        if (!(receiver.qwiicMotorStatus(receiver.eQwiicMotorChip.ab))) {
            lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 7, 7, Index)
            basic.pause(1000)
        }
    }
    if (car.wattmeterReset(4096) && car.wattmeterakkuleer()) {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 7, 10, lcd20x4.lcd20x4_text("Akku"))
    }
}
