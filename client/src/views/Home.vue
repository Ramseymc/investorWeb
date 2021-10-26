<template>
  <div>
    <input type="file" onchange="this.loadFile(this.files[0])">
    <br>
    <pre id="output"></pre>
    
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted() {
    // Requiring fs module in which 
// readFile function is defined.
    fetch('Input.txt')
  .then(response => response.text())
  .then(data => {
  	// Do something with your data
  	console.log(data);
  });
  },
method: {
      async loadFile(file) {
        let text = await file.text();
        document.getElementById('output').textContent = text;
      },
      
}

};

</script>
