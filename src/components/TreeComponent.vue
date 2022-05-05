<script setup>
import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  id: Number,
  label: String,
  nodes: [],
  type: String,
  isRoot: Boolean,
});

const store = useStore();
const hide = ref(props.isRoot ? true : false);
const isEdit = ref(false);

const toggleHide = () => {
  if (isEdit.value) return;

  hide.value = !hide.value;
};

const changeNodes = (nodes, { type, id, label }) => {
  if (!nodes) return;

  switch (type) {
    case 'edit':
      {
        if (nodes.length) {
          nodes.forEach((x) => {
            if (x.id === id) {
              x.label = label;
            }
          });
        }
      }
      break;
    case 'delete':
      {
        nodes = nodes.filter((x) => x.id !== id);
      }
      break;
  }
  /*
    С удалением криво вышло, в switch удаление работает по всем элемент, но в итоге функция все равно возвращает элементы, не понял почему так, возможно что-то упускаю
    - удаление(filter) в switch работает для верхнего списка
    - ниже удаление(filter) работает для всех дочерних элементов
    Если есть возможность указать на ошибку, с радостью рассмотрю
  */
  nodes.forEach((item) => {
    if (type === 'delete' && item.nodes) {
      item.nodes = item.nodes.filter((x) => x.id !== id);
    }

    changeNodes(item.nodes, { type, id, label });
  });

  return nodes;
};

const editItem = () => {
  isEdit.value = !isEdit.value;

  const newTree = changeNodes(store.state.tree, {
    type: 'edit',
    id: props.id,
    label: props.label,
  });

  store.commit('updateTree', newTree);
};

const deleteItem = () => {
  const newTree = changeNodes(store.state.tree, {
    type: 'delete',
    id: props.id,
    label: props.label,
  });

  store.commit('updateTree', newTree);
};
</script>

<template>
  <div>
    <div v-if="!isRoot" :class="$style.item">
      <div :class="$style.label" @click="toggleHide">
        <img :src="`../${type}.svg`" alt="" />
        <input v-if="isEdit" v-model="label" />
        <span v-else>{{ label }}</span>
      </div>
      <div :class="$style.buttons">
        <img
          @click="editItem"
          :src="isEdit ? '../done.svg' : '../edit.svg'"
          alt=""
        />
        <img @click="deleteItem" :src="'../delete.svg'" alt="" />
      </div>
    </div>
    <div v-if="hide" :class="[isRoot ? $style.root : $style.child]">
      <tree-component
        v-for="{ id, label, nodes, type } in nodes"
        :id="id"
        :label="label"
        :nodes="nodes"
        :type="type"
        :key="id"
      ></tree-component>
    </div>
  </div>
</template>

<style module>
.item {
  display: flex;
  justify-content: space-between;
}

.label {
  display: flex;
  align-items: center;
  flex: 0 1 80%;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
}

.label input {
  width: 100px;
}

.root {
  width: 200px;
}

.child {
  margin-left: 10px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.buttons img {
  width: 14px;
  cursor: pointer;
}
</style>
