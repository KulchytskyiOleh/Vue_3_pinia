<template>
    <div class="dropzone-container">
      <div
        class="dropzone"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{ 'dropzone-active': isDragging }"
      >
        <div class="dropzone-content" @click="$refs.fileInput.click()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          <p v-if="!isDragging">Elige un archivo para subir</p>
          <p v-else>Suelta el archivo aquí</p>
          <p class="dropzone-hint">Es imprescindible adjuntar el documento original y completo de la guía docente de la asignatura, o el documento equivalente del centro docente.</p>
          <p class="dropzone-info">Tipos de archivos aceptados: jpg, gif, png, pdf, zip, word, doc, docx, txt. Tamaño máximo de archivo: 30 MB.</p>
        </div>
        <input type="file" ref="fileInput" @change="onFileSelected" multiple style="display: none">
      </div>

      <div class="tooltip" v-if="showTooltip">{{ tooltipMessage }}</div>

      <div class="uploaded-files-grid">
        <div v-for="file in uploadedFiles" :key="file.id" class="file-preview uploaded">
          <div class="file-icon" :class="getFileIconClass(file)"></div>
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
          <span class="status">Loaded</span>
          <button @click="removeFile(file)" class="remove-btn">&times;</button>
        </div>
      </div>

      <div v-for="file in uploadingFiles" :key="file.id" class="file-preview uploading">
        <div class="file-icon" :class="getFileIconClass(file)"></div>
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
        </div>
        <div class="progress-info">
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${file.progress}%` }"></div>
          </div>
          <span class="progress-text">{{ file.progress }}% · {{ file.remainingTime }}</span>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, reactive } from 'vue';

  import axios from 'axios'; // Uncomment this line when using real server

  const uploadingFiles = ref([]);
  const uploadedFiles = ref([]);
  const fileInput = ref(null);
  const isDragging = ref(false);
  const showTooltip = ref(false);
  const tooltipMessage = ref('');

  const acceptedTypes = ['jpg', 'gif', 'png', 'pdf', 'zip', 'word', 'doc', 'docx', 'txt'];
  const maxFileSize = 30 * 1024 * 1024; // 30 MB

  const onDragOver = () => {
    isDragging.value = true;
  };

  const onDragLeave = () => {
    isDragging.value = false;
  };

  const onDrop = (e) => {
    isDragging.value = false;
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const onFileSelected = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    newFiles.forEach(file => {
      if (isValidFile(file) && !isDuplicateFile(file)) {
        const newFile = reactive({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          progress: 0,
          remainingTime: 'Calculando...',
          startTime: Date.now()
        });
        uploadingFiles.value.push(newFile);
        uploadFile(newFile);
      }
    });
  };

  const isValidFile = (file) => {
    const fileType = file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileType)) {
      showTooltipMessage('Invalid file type');
      return false;
    }
    if (file.size > maxFileSize) {
      showTooltipMessage('File size exceeds 30 MB limit');
      return false;
    }
    return true;
  };

  const isDuplicateFile = (file) => {
    const isDuplicate = [...uploadingFiles.value, ...uploadedFiles.value].some(
      existingFile => existingFile.name === file.name && existingFile.size === file.size
    );
    if (isDuplicate) {
      showTooltipMessage('This file has already been uploaded or is currently uploading.');
    }
    return isDuplicate;
  };

  const showTooltipMessage = (message) => {
    tooltipMessage.value = message;
    showTooltip.value = true;
    setTimeout(() => {
      showTooltip.value = false;
    }, 3000);
  };

  const uploadFile = (file) => {
    // Simulation code - comment out when using real server
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress > 100) progress = 100;

      updateFileProgress(file.id, progress);

      if (progress === 100) {
        clearInterval(interval);
        const index = uploadingFiles.value.findIndex(f => f.id === file.id);
        if (index !== -1) {
          const [completedFile] = uploadingFiles.value.splice(index, 1);
          uploadedFiles.value.push(completedFile);
        }
      }
    }, 500);

    // Real server upload code - uncomment and modify when using real server
    /*
    const formData = new FormData();
    formData.append('file', file.file);

    axios.post('/your-upload-endpoint', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        updateFileProgress(file.id, percentCompleted);
      }
    }).then(response => {
      const index = uploadingFiles.value.findIndex(f => f.id === file.id);
      if (index !== -1) {
        const [completedFile] = uploadingFiles.value.splice(index, 1);
        uploadedFiles.value.push(completedFile);
      }
    }).catch(error => {
      console.error('File upload failed', error);
      // Handle upload failure (e.g., show error message)
    });
    */
  };

  const updateFileProgress = (fileId, progress) => {
    const file = uploadingFiles.value.find(f => f.id === fileId);
    if (file) {
      file.progress = progress;
      updateRemainingTime(file, (progress / 100) * file.size, file.size);
    }
  };

  const updateRemainingTime = (file, loaded, total) => {
    const elapsedTime = Date.now() - file.startTime;
    const uploadSpeed = loaded / (elapsedTime / 1000); // bytes per second
    const remainingBytes = total - loaded;
    const remainingTimeMs = (remainingBytes / uploadSpeed) * 1000;
    file.remainingTime = formatRemainingTime(remainingTimeMs);
  };

  const removeFile = (file) => {
    const index = uploadedFiles.value.findIndex(f => f.id === file.id);
    if (index !== -1) {
      uploadedFiles.value.splice(index, 1);
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatRemainingTime = (ms) => {
    if (ms < 1000) return 'Menos de 1 segundo';
    if (ms < 60000) return `${Math.round(ms / 1000)} segundos`;
    return `${Math.round(ms / 60000)} minutos`;
  };

  const getFileIconClass = (file) => {
    const fileType = file.name.split('.').pop().toLowerCase();
    return `file-icon-${fileType}`;
  };
  </script>

  <style lang="scss">
  .dropzone-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;

    .dropzone {
      border: 2px dashed #ccc;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 20px;
      transition: all 0.3s ease;

      &.dropzone-active {
        border-color: #4caf50;
        background-color: #e8f5e9;
      }

      .dropzone-content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .upload-icon {
          margin-bottom: 10px;
        }

        .dropzone-hint,
        .dropzone-info {
          font-size: 0.9em;
          color: #666;
          margin-top: 10px;
        }
      }
    }

    .uploaded-files-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 20px;
    }

    .file-preview {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 10px;

      &.uploading {
        background-color: #f9f9f9;
      }

      &.uploaded {
        flex-direction: column;
        text-align: center;

        .file-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 10px;
        }
      }

      .file-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background-size: cover;
      }

      .file-info {
        flex-grow: 1;

        .file-name {
          font-weight: bold;
          display: block;
        }

        .file-size {
          font-size: 0.8em;
          color: #666;
        }
      }

      .progress-info {
        display: flex;
        align-items: center;
        width: 100%;

        .progress-bar {
          flex-grow: 1;
          height: 5px;
          background-color: #eee;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 10px;

          .progress {
            height: 100%;
            background-color: #4caf50;
            transition: width 0.3s linear;
          }
        }

        .progress-text {
          font-size: 0.8em;
          color: #666;
          white-space: nowrap;
        }
      }

      .status {
        color: #4caf50;
        margin-top: 5px;
      }

      .remove-btn {
        background: none;
        border: none;
        color: #ff0000;
        cursor: pointer;
        font-size: 1.2em;
        margin-top: 5px;
      }
    }

    .tooltip {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9em;
      z-index: 1000;
    }

    // File type icons (add more for different file types)
    .file-icon-jpg,
    .file-icon-gif,
    .file-icon-png {
      background-image: url('path-to-image-icon.svg');
    }

    .file-icon-pdf {
      background-image: url('path-to-pdf-icon.svg');
    }

    .file-icon-zip {
      background-image: url('path-to-zip-icon.svg');
    }

    .file-icon-doc,
    .file-icon-docx {
      background-image: url('path-to-word-icon.svg');
    }

    .file-icon-txt {
      background-image: url('path-to-text-icon.svg');
    }
  }


  </style>

  <!-- <style scoped lang="scss">
  .dropzone-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .dropzone {
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .dropzone-active {
    border-color: #4caf50;
    background-color: #e8f5e9;
  }

  .dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-icon {
    margin-bottom: 10px;
  }

  .dropzone-hint, .dropzone-info {
    font-size: 0.9em;
    color: #666;
    margin-top: 10px;
  }

  .uploaded-files-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

  .file-preview {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .file-preview.uploading {
    background-color: #f9f9f9;
  }

  .file-preview.uploaded {
    flex-direction: column;
    text-align: center;
  }

  .file-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-size: cover;
  }

  .file-preview.uploaded .file-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 10px;
  }

  .file-info {
    flex-grow: 1;
  }

  .file-name {
    font-weight: bold;
    display: block;
  }

  .file-size {
    font-size: 0.8em;
    color: #666;
  }

  .progress-info {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .progress-bar {
    flex-grow: 1;
    height: 5px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
  }

  .progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s linear;
  }

  .progress-text {
    font-size: 0.8em;
    color: #666;
    white-space: nowrap;
  }

  .status {
    color: #4caf50;
    margin-top: 5px;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
    font-size: 1.2em;
    margin-top: 5px;
  }

  .tooltip {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.9em;
    z-index: 1000;
  }

  /* File type icons (you'd need to add more for each file type) */
  .file-icon-jpg, .file-icon-gif, .file-icon-png { background-image: url('path-to-image-icon.svg'); }
  .file-icon-pdf { background-image: url('path-to-pdf-icon.svg'); }
  .file-icon-zip { background-image: url('path-to-zip-icon.svg'); }
  .file-icon-doc, .file-icon-docx { background-image: url('path-to-word-icon.svg'); }
  .file-icon-txt { background-image: url('path-to-text-icon.svg'); }
  </style> -->