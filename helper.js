function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function makeProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

/**
 * Create a new buffer, bind it to a specific type.
 * Then give data to the new buffer.
 * 
 * @param {context} gl    - GL context from canvas
 * @param {various} data  - data to pass to buffer
 * @param {constant} type - type of buffer to bind
 */
function fillBuffer(gl, data, type){
    let bufferType = gl.ARRAY_BUFFER;
    // Guard against too few arguments
    if (type) {
        bufferType = type;
    }
    let buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, data, gl.STATIC_DRAW);
}

/**
 * Helper function to get attribute location and couple it
 * withwith the given JS variable.
 * 
 * @param {context} gl          - GL context from canvas
 * @param {porgram} program     - program from shaders
 * @param {string} attribute    - attribute name as string
 * @param {num} dataSize        - data size as integer
 * @param {constant} dataType   - data type as constant
 * @param {boolean} dataNorm    - boolean if data is normalized
 */
function pointAttributes(gl, program, attribute, dataSize, dataType, dataNorm){
    let attributeLocation = gl.getAttribLocation(program, attribute);

    let size = dataSize;
    let type = gl.FLOAT;
    // Guard against too few arguments
    if (dataType){
        type = dataType;
    }
    let normalize = false;
    // Guard against missing arguments
    if (dataNorm){
        normalize = dataNorm;
    }
    let stride = 0;
    let offset = 0;

    gl.vertexAttribPointer (attributeLocation, size, type, normalize, stride, offset);
    gl.enableVertexAttribArray(attributeLocation);
}
/**
 * Checks if the timer has reached zero and updates accodingly.
 * 
 * @returns nothing
 */
function checkTimer() {
    if (--timer <= 0) {
        resetImage();
        document.getElementById("TimerSeconds").innerText = "0s";
        return;}
    timerID = setTimeout(function() {checkTimer();}, 1000);
    document.getElementById("TimerSeconds").innerText = "" + timer + "s";
}

/**
 * Check if buttons are pressed and rotate or move
 * the object accodingly. 
 * 
 * @param {*} event 
 */
function buttonPressed(event){
    // Set Timer
    timer = 10;
    clearTimeout(timerID);
    event = event || window.event;
    // Key codes for panning
    if (event.keyCode == '37') {
    // Left Arrow pan left
    posX -= 1;
    } else if (event.keyCode == '38') {
    // Up Arrow pan up
    posY += 1;
    } else if (event.keyCode == '39') {
    // Right Arrow pan right
    posX += 1;
    } else if (event.keyCode == '40') {
    // Down Arrow pan down
    posY -= 1;
    } else if (event.keyCode == '187') {
    // Plus Key pan in
    posZ -= 1;
    } else if (event.keyCode == '189') {
    // Minus Key pan out
    posZ += 1;
    }

    // Key codes for rotation
    if (event.keyCode == '65') {
    // A for rotate left
    y_angle -= 1;
    y_angle = y_angle%361;
    } else if (event.keyCode == '68') {
    // D for rotate right
    y_angle += 1;
    y_angle = y_angle%361;
    } else if (event.keyCode == '83') {
    // S for rotate down
    x_angle -= 1;
    x_angle = x_angle%361;
    } else if (event.keyCode == '87') {
    // W for rotate up
    x_angle += 1;
    x_angle = x_angle%361;
    } else if (event.keyCode == '69') {
    // E for rotate clockwise
    z_angle -= 1;
    z_angle = z_angle%361;
    } else if (event.keyCode == '81') {
    // Q for rotate couter-clockwise
    z_angle += 1;
    z_angle = z_angle%361;
    }

    // Key code to reset everything back
    if (event.keyCode == '82') {
    // R for reset
    resetImage();
    }
    if (timer > 0) {
    checkTimer();
    }
}

/**
 * Just reset all values to zero and rotate automatically.
 */
function resetImage() {
    timer = 0;
    x_angle = 0;
    y_angle = 0;
    z_angle = 0;
    posX = 0;
    posY = 0;
    posZ = 0;
}
      