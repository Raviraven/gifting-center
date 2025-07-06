if [ -z $PI_ADDRESS ]; then
    echo "PI_ADDRESS local variable missing"
else
    PI_ADDRESS="pi@$PI_ADDRESS"
    eval "rsync -av --exclude-from=exclude-from-pi.txt ./ ${PI_ADDRESS}:/home/pi/gifting-center"
fi