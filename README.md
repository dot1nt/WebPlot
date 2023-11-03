# WebPlot
A web-based Serial Data Plotter. [Demo](https://dot1nt.github.io/webplot)

## Preview
![preview](https://github.com/dot1nt/WebPlot/blob/main/assets/image.png)

## Usage
Serial data from the device must be separated by a comma and ending with a newline.

### Example Arduino Sketch

```
void setup() {
  Serial.begin(38400);
}

int idx = 0;
void loop() {
  idx++;
  
  Serial.print(sin(idx*0.1) * sin(idx*0.01));
  Serial.print(",");
  Serial.println(sin(idx*0.15) * cos(idx*0.01));
  
  delay(50);
}
```

## Building
```
git clone https://github.com/dot1nt/WebPlot.git && cd WebPlot
npm install
npm run build
```
