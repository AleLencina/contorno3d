document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file-upload');
        const materialSelect = document.getElementById('material');
        const infillSelect = document.getElementById('infill');
        const file = fileInput.files[0];
        const material = materialSelect.value;
        const infill = parseInt(infillSelect.value, 10);

        if (file && file.name.endsWith('.stl')) {
            try {
                const volume = await getSTLVolume(file);
                const cost = calculateCost(volume, material, infill);
                resultDiv.textContent = `El coste estimado de producción es: $${cost.toFixed(2)}`;
            } catch (error) {
                resultDiv.textContent = 'Error al procesar el archivo STL.';
                console.error(error);
            }
        } else {
            resultDiv.textContent = 'Por favor, sube un archivo STL válido.';
        }
    });

    function calculateCost(volume, material, infill) {
        const materialCost = getMaterialCost(material);
        const adjustedVolume = volume * (infill / 100);
        return adjustedVolume * materialCost;
    }

    function getMaterialCost(material) {
        switch (material) {
            case 'PLA': return 0.05; // $ por cm³
            case 'ABS': return 0.06; // $ por cm³
            case 'PETG': return 0.07; // $ por cm³
            default: return 0;
        }
    }

    function getSTLVolume(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const contents = reader.result;
                // Aquí debería implementarse el cálculo del volumen del archivo STL
                // Para simplificar, vamos a devolver un volumen ficticio.
                const volume = 100; // cm³ ficticio
                resolve(volume);
            };
            reader.onerror = () => {
                reject(new Error('Error al leer el archivo STL'));
            };
            reader.readAsArrayBuffer(file);
        });
    }
});