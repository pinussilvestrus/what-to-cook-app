<script>
  import { onMount } from 'svelte';

  import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

  const noop = () => {};

  const bindListeners = (modeler) => {
    modeler.on('import.done', function(event) {
      onDiagramLoaded(modeler);
    });
  };

  onMount(async () => {
    const viewer = new BpmnViewer({
      container: '.diagram-container'
    });

    const { error } = await viewer.importXML(xml);

    if (error) {
      console.error(error);
      return;
    }

    const canvas = viewer.get('canvas');

    canvas.zoom('fit-viewport');

    onDiagramLoaded(viewer);

    bindListeners(viewer);
  });

  export let xml = '';

  export let onDiagramLoaded = noop;
</script>

<style lang="scss">
  #diagram {
    position: relative;
    height: 100%;
  }
</style>

<div id="diagram">
  <div class="diagram-container"></div>
</div>