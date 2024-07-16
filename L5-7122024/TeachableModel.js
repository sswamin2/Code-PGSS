{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "ename": "SyntaxError",
     "evalue": "invalid syntax (4140181677.py, line 1)",
     "output_type": "error",
     "traceback": [
      "\u001b[1;36m  Cell \u001b[1;32mIn[1], line 1\u001b[1;36m\u001b[0m\n\u001b[1;33m    <div>Teachable Machine Image Model</div>\u001b[0m\n\u001b[1;37m    ^\u001b[0m\n\u001b[1;31mSyntaxError\u001b[0m\u001b[1;31m:\u001b[0m invalid syntax\n"
     ]
    }
   ],
   "source": [
    "<div>Teachable Machine Image Model</div>\n",
    "<button type=\"button\" onclick=\"init()\">Start</button>\n",
    "<div id=\"webcam-container\"></div>\n",
    "<div id=\"label-container\"></div>\n",
    "<script src=\"https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js\"></script>\n",
    "<script src=\"https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js\"></script>\n",
    "<script type=\"text/javascript\">\n",
    "    // More API functions here:\n",
    "    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image\n",
    "\n",
    "    // the link to your model provided by Teachable Machine export panel\n",
    "    const URL = \"./my_model/\";\n",
    "\n",
    "    let model, webcam, labelContainer, maxPredictions;\n",
    "\n",
    "    // Load the image model and setup the webcam\n",
    "    async function init() {\n",
    "        const modelURL = URL + \"model.json\";\n",
    "        const metadataURL = URL + \"metadata.json\";\n",
    "\n",
    "        // load the model and metadata\n",
    "        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker\n",
    "        // or files from your local hard drive\n",
    "        // Note: the pose library adds \"tmImage\" object to your window (window.tmImage)\n",
    "        model = await tmImage.load(modelURL, metadataURL);\n",
    "        maxPredictions = model.getTotalClasses();\n",
    "\n",
    "        // Convenience function to setup a webcam\n",
    "        const flip = true; // whether to flip the webcam\n",
    "        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip\n",
    "        await webcam.setup(); // request access to the webcam\n",
    "        await webcam.play();\n",
    "        window.requestAnimationFrame(loop);\n",
    "\n",
    "        // append elements to the DOM\n",
    "        document.getElementById(\"webcam-container\").appendChild(webcam.canvas);\n",
    "        labelContainer = document.getElementById(\"label-container\");\n",
    "        for (let i = 0; i < maxPredictions; i++) { // and class labels\n",
    "            labelContainer.appendChild(document.createElement(\"div\"));\n",
    "        }\n",
    "    }\n",
    "\n",
    "    async function loop() {\n",
    "        webcam.update(); // update the webcam frame\n",
    "        await predict();\n",
    "        window.requestAnimationFrame(loop);\n",
    "    }\n",
    "\n",
    "    // run the webcam image through the image model\n",
    "    async function predict() {\n",
    "        // predict can take in an image, video or canvas html element\n",
    "        const prediction = await model.predict(webcam.canvas);\n",
    "        for (let i = 0; i < maxPredictions; i++) {\n",
    "            const classPrediction =\n",
    "                prediction[i].className + \": \" + prediction[i].probability.toFixed(2);\n",
    "            labelContainer.childNodes[i].innerHTML = classPrediction;\n",
    "        }\n",
    "    }\n",
    "</script>\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "base",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.7"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
