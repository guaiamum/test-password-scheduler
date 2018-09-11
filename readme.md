# Using crontab to schedule task
Run `crontab -e` to edit the current cron's, if you've never done this, it might ask you which editor it should set as default, I recommend nano. 
Then add the following line to the end of the file:
```
0 12 * * * cd /path/to/script/ && export DISPLAY=:0 && bash script.sh > output.log 2>&1
```
## About the command above:
  * `0 12 * * * ` tells cron to run the script every day at lunch-time (12:00), you may change this to suit your needs, you may use https://crontab.guru/ to calculate it :)
  * `cd /path/to/script/` changes directory to the script's location (you should change to the right one), for the script to work properly
  * `export DISPLAY=:0` tells the script which display to use (yours might differ, certify running `echo $DISPLAY` in a terminal window)
  * `bash script.sh` runs the script with bash
  * `> output.log 2>&1` logs the latest output to `output.log` file (cerated in the script dir), including errors (`2>&1`)

# Caveats
This script assumes you have nvm