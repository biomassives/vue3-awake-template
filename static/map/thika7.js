
  // Define the required functions in the global scope
  function toggleSettings(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
  }

  function exportDataToZip() {
    localforage.getItem('mapData')
      .then(mapData => {
        if (!mapData) {
          alert('No data to export');
          return;
        }

        const zip = new JSZip();
        zip.file('mapData.json', JSON.stringify(mapData));

        zip.generateAsync({ type: 'blob' })
          .then(blob => {
            saveAs(blob, 'mapData.zip');
          });
      })
      .catch(error => console.error('Error exporting data:', error));
  }

  function saveSupabaseSettings() {
    const supabaseUrl = document.getElementById('supabase-url').value;
    const supabaseKey = document.getElementById('supabase-key').value;

    localforage.setItem('supabaseSettings', { supabaseUrl, supabaseKey })
      .then(() => alert('Supabase settings saved successfully'))
      .catch(error => console.error('Error saving Supabase settings:', error));
  }

  function archiveCollection() {
    const collectionName = document.getElementById('collection-name').value;
    if (!collectionName) {
      alert('Please enter a collection name.');
      return;
    }

    localforage.getItem('mapData')
      .then(mapData => {
        if (mapData) {
          return localforage.setItem(collectionName, mapData);
        } else {
          alert('No data to archive.');
        }
      })
      .then(() => {
        alert('Collection archived successfully.');
        updateCollectionList();
      })
      .catch(error => console.error('Error archiving collection:', error));
  }

  function loadCollection() {
    const collectionName = document.getElementById('load-collection').value;
    if (!collectionName) {
      alert('Please select a collection.');
      return;
    }

    localforage.getItem(collectionName)
      .then(mapData => {
        if (mapData) {
          drawnItems.clearLayers();
          mapData.layers.forEach(layerData => {
            let layer;
            if (layerData.type === 'circle') {
              layer = L.circle(layerData.latlngs);
            } else if (layerData.type === 'polygon') {
              layer = L.polygon(layerData.latlngs);
            } else if (layerData.type === 'point') {
              layer = L.marker(layerData.latlngs);
              if (layerData.popupContent) {
                addEditLinkToPopup(layer, layerData.popupContent);
                layer.bindPopup(layerData.popupContent);
              }
            }
            drawnItems.addLayer(layer);
          });
          alert('Collection loaded successfully.');
        } else {
          alert('No data found for this collection.');
        }
      })
      .catch(error => console.error('Error loading collection:', error));
  }

  function clearMap() {
    drawnItems.clearLayers();
    localforage.removeItem('mapData')
      .then(() => {
        alert('Map cleared and local data removed.');
      })
      .catch(error => console.error('Error clearing map data:', error));
  }

  function saveMapView() {
    const mapData = {
      center: map.getCenter(),
      zoom: map.getZoom()
    };
    localforage.setItem('mapView', mapData)
      .then(() => {
        alert('Map view saved.');
      })
      .catch(error => console.error('Error saving map view:', error));
  }

  function loadMapView() {
    localforage.getItem('mapView')
      .then(mapView => {
        if (mapView) {
          map.setView(mapView.center, mapView.zoom);
        }
      })
      .catch(error => console.error('Error loading map view:', error));
  }

  function updateCollectionList() {
    const loadCollectionSelect = document.getElementById('load-collection');
    loadCollectionSelect.innerHTML = '';

    localforage.keys()
      .then(keys => {
        keys.forEach(key => {
          if (key !== 'mapData' && key !== 'supabaseSettings' && key !== 'mapView') {
            const option = document.createElement('option');
            option.value = key;
            option.text = key;
            loadCollectionSelect.add(option);
          }
        });
      })
      .catch(error => console.error('Error updating collection list:', error));
  }

  function closeInputContainer() {
    const inputContainer = document.getElementById('input-container');
    inputContainer.classList.add('fade-out');
    setTimeout(() => {
      inputContainer.style.display = 'none';
    }, 500); // Match the duration of the CSS transition
  }

  document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([-1.046560, 37.059891], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: true,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    let currentLayer; // To store the layer being edited

    map.on('draw:created', function (e) {
      currentLayer = e.layer;

      // Show the input form
      const inputContainer = document.getElementById('input-container');
      inputContainer.style.display = 'block';
      inputContainer.classList.remove('fade-out');

      // Reset form fields
      document.getElementById('userInput').value = '';
      document.getElementById('fileInput').value = '';

      // Listen for form submission
      document.getElementById('saveUserInput').onclick = function () {
        const userInput = document.getElementById('userInput').value;
        const fileInput = document.getElementById('fileInput').files[0];
        let popupContent = userInput;

        if (fileInput) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            popupContent += `<br><img src="${img.src}" style="width: 100px; height: 100px;">`;
            addEditLinkToPopup(currentLayer, popupContent);
            currentLayer.bindPopup(popupContent).openPopup();
            drawnItems.addLayer(currentLayer);
            saveToLocalDatabase();
            closeInputContainer();
          };
          reader.readAsDataURL(fileInput);
        } else {
          addEditLinkToPopup(currentLayer, popupContent);
          currentLayer.bindPopup(popupContent).openPopup();
          drawnItems.addLayer(currentLayer);
          saveToLocalDatabase();
          closeInputContainer();
        }
      };
    });

    function addEditLinkToPopup(layer, popupContent) {
      const editLink = '<br><a href="#" onclick="editLayer(' + layer._leaflet_id + ')">Edit</a>';
      if (!popupContent.includes(editLink)) {
        popupContent += editLink;
      }
      layer.bindPopup(popupContent);
    }

    window.editLayer = function(layerId) {
      const layer = drawnItems.getLayer(layerId);
      const currentContent = layer.getPopup().getContent();
      const newContent = prompt('Edit content:', currentContent.replace(/<br><a.*<\/a>/, '')); // Remove the existing edit link for prompt
      if (newContent !== null) {
        addEditLinkToPopup(layer, newContent);
        layer.setPopupContent(newContent + '<br><a href="#" onclick="editLayer(' + layer._leaflet_id + ')">Edit</a>').openPopup();
        saveToLocalDatabase();
      }
    };

    map.on('draw:edited', function (e) {
      const layers = e.layers;
      layers.eachLayer(function (layer) {
        const updatedData = {
          type: layer instanceof L.Circle ? 'circle' : layer instanceof L.Polygon ? 'polygon' : 'point',
          latlngs: layer.getLatLng(),
          popupContent: layer.getPopup() ? layer.getPopup().getContent() : null,
        };

        console.log('Updated Layer Data:', updatedData);

        updateLocalStorage(layer._leaflet_id, updatedData);
      });
    });

    function updateLocalStorage(layerId, updatedData) {
      localforage.getItem('mapData')
        .then(mapData => {
          if (mapData) {
            for (let data of mapData.layers) {
              if (data.layerId === layerId) {
                data.latlngs = updatedData.latlngs;
                data.popupContent = updatedData.popupContent;
                break;
              }
            }
            return localforage.setItem('mapData', mapData);
          }
        })
        .then(() => console.log('Data updated locally'))
        .catch(error => console.error('Error updating data locally:', error));
    }

    function saveToLocalDatabase() {
      const data = {
        layers: []
      };

      drawnItems.eachLayer(function(layer) {
        const layerData = {
          layerId: layer._leaflet_id,
          type: layer instanceof L.Circle ? 'circle' : layer instanceof L.Polygon ? 'polygon' : 'point',
          latlngs: layer.getLatLng(),
          popupContent: layer.getPopup() ? layer.getPopup().getContent() : null,
        };

        data.layers.push(layerData);
      });

      localforage.setItem('mapData', data)
        .then(() => console.log('Data saved locally'))
        .catch(error => console.error('Error saving data locally:', error));
    }

    function loadFromLocalDatabase() {
      localforage.getItem('mapData')
        .then(mapData => {
          if (mapData && mapData.layers) {
            mapData.layers.forEach(layerData => {
              let layer;
              if (layerData.type === 'circle') {
                layer = L.circle(layerData.latlngs);
              } else if (layerData.type === 'polygon') {
                layer = L.polygon(layerData.latlngs);
              } else if (layerData.type === 'point') {
                layer = L.marker(layerData.latlngs);
                if (layerData.popupContent) {
                  addEditLinkToPopup(layer, layerData.popupContent);
                  layer.bindPopup(layerData.popupContent);
                }
              }
              drawnItems.addLayer(layer);
            });

            // Move view to the center of new points
            if (mapData.layers.length > 0) {
              const lats = mapData.layers.map(layer => layer.latlngs.lat);
              const lngs = mapData.layers.map(layer => layer.latlngs.lng);
              const centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
              const centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
              map.setView([centerLat, centerLng], 12);
            }
          }
        })
        .catch(error => console.error('Error loading data locally:', error));
    }

    function exportDataToZip() {
      localforage.getItem('mapData')
        .then(mapData => {
          if (!mapData) {
            alert('No data to export');
            return;
          }

          const zip = new JSZip();
          zip.file('mapData.json', JSON.stringify(mapData));

          zip.generateAsync({ type: 'blob' })
            .then(blob => {
              saveAs(blob, 'mapData.zip');
            });
        })
        .catch(error => console.error('Error exporting data:', error));
    }

    document.getElementById('import-zip').addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const zip = new JSZip();
        zip.loadAsync(file)
          .then(zip => zip.file('mapData.json').async('string'))
          .then(jsonData => {
            const mapData = JSON.parse(jsonData);
            return localforage.setItem('mapData', mapData);
          })
          .then(() => {
            loadFromLocalDatabase();
            alert('Data imported successfully');
          })
          .catch(error => console.error('Error importing data:', error));
      }
    });

    document.getElementById('hamburger').addEventListener('click', function() {
      const navContainer = document.getElementById('nav-container');
      navContainer.style.display = navContainer.style.display === 'none' ? 'flex' : 'none';
      navContainer.style.maxHeight = navContainer.style.display === 'flex' ? '500px' : '0';
    });

    // Load data from local storage on page load
    loadFromLocalDatabase();
    loadMapView();
    updateCollectionList();
    loadUsername();
  });
