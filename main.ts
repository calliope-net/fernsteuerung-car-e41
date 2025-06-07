function zeigeStatus () {
	
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    receiver.pinRelay(false)
})
function zeigeStatus2 () {
	
}
pins.onPulsed(DigitalPin.C16, PulseValue.Low, function () {
	
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
    }
    receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, btf.getaktiviert(receivedData, btf.e3aktiviert.m0))
    receiver.selectMotor128Servo16(btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b0_Motor), btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b1_Servo))
    car.buzzer(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 3, receiver.selectMotorSpeed(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 4, 7, receiver.pinServoWinkel(), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 11, 15, receiver.encoderCounterM0(), lcd20x4.eAlign.right)
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
            lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 6, 6, Index)
            basic.pause(1000)
        }
    }
}
loops.everyInterval(1000, function () {
	
})
loops.everyInterval(1000, function () {
	
})
