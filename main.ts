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
    receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, btf.getaktiviert(receivedData, btf.e3aktiviert.m0))
    receiver.selectMotor128Servo16(btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b0_Motor), btf.getByte(receivedData, btf.eBufferPointer.m0, btf.eBufferOffset.b1_Servo))
})
if (!(btf.simulator())) {
    led.enable(false)
    receiver.beimStart(
    receiver.eHardware.car4,
    90,
    false,
    65,
    true
    )
    for (let Index = 0; Index <= 9; Index++) {
        if (!(receiver.qwiicMotorStatus(receiver.eQwiicMotorChip.ab))) {
            basic.showNumber(Index)
            basic.pause(2000)
        }
    }
}
loops.everyInterval(1000, function () {
	
})
