<template>
  <div class="v-fee-calculator">
    <el-card class="v-fee-calculator__card">
      <el-form labelPosition="top">
        
        <el-form-item label="Enter starting amount">
          <el-input v-model="amount" type="number" pattern="[0-9]*">
            <template #prepend>$</template>
          </el-input>
        </el-form-item>

        <el-form-item 
          label="Select operation" 
          class="v-fee-calculator__buttons"
        >
            <el-button
              v-for="{ label, disabled, value } in availableOperations"
              :key="label"
              closable
              :disabled="disabled"
              @click="handleOperationSelect(value)"
            >
              {{ label }}
            </el-button>
        </el-form-item>

        <el-form-item class="v-fee-calculator__tag-list">
          <div
            class="v-fee-calculator__tag-item"
            v-for="({ label, value }, index) in operationList"
            :key="label"
          >
            <el-tag
              effect="dark"
              closable
              type="primary"
              @close="handleOperationRemove(value)"
            >
              <span>{{ label }} </span>
            </el-tag>

            <i class="el-icon-circle-plus-outline" v-if="index < operationList.length - 1"></i>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="v-fee-calculator__card">
      <template v-if="!selectedOperation || !amount">
        <div class="v-fee-calculator__card-placeholder">
          <h4>
            Please enter an ammount and select an operation to continue
          </h4>
        </div>

      </template>

      <el-descriptions 
        v-else
        border
        :column="1"
      >
        <el-descriptions-item>
          <template #label>
            Amount before tax
          </template>
          {{ formatCurrency(amount) }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            Tax
          </template>
          {{ formatCurrency(calculatedFees.fees) }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <strong> Amount after tax</strong>
          </template>
          {{ formatCurrency(calculatedFees.amountAfterFees) }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import keyBy from 'lodash/keyBy'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'FeeCalculator',
  
  props: {
    type: {
      type: String,
      default: '',
    }
  },
  
  setup () {
    const state = reactive({
      amount: '',
      operationList: [],
      allOperations: [
        {
          label: 'Buy',
          value: 'buy',
          children: ['deposit']
        },
        {
          label: 'Claim',
          value: 'claim',
          children: ['sell']
        },
        {
          label: 'Sell',
          value: 'sell',
        },
        {
          label: 'Deposit',
          value: 'deposit',
        },
        {
          label: 'Hydrate',
          value: 'hydrate',
        }
      ],
      fees: {
        hydrate: 0.05,
        claim: 0.1,
        sell: 0.1,
        deposit: 0.1,
        buy: 0,
      }
    })
    
    const calculateFees = ({ operationList, amount, fees }) => {
      return operationList.reduce((accumulator, operation) => {
        const currentFee = fees[operation.value] * accumulator.amountAfterFees
        accumulator.fees += currentFee 
        accumulator.amountAfterFees = accumulator.amountAfterFees - currentFee 
        return accumulator
      }, { fees: 0, amountAfterFees: amount })
    }

    const calculatedFees = computed(() => calculateFees(state))
    const allOperationsByKey = computed(() => keyBy(state.allOperations, 'value'))
    const operationListByKey = computed(() => keyBy(state.operationList, 'value'))
    const selectedOperation = computed(() => state.operationList[state.operationList.length - 1])
    const availableOperations = computed(() => state.allOperations.map(operation => {
      if (!selectedOperation.value) {
        operation.disabled = false
        return operation
      }
      
      operation.disabled = !selectedOperation.value?.children?.includes(operation.value)
      return operation
    }).filter(operation => {
      if(isEmpty(operationListByKey.value)) return true
      return !operationListByKey.value[operation.value]
    }))

    const formatCurrency = amount => new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(amount)
    const handleOperationSelect = value => state.operationList.push(allOperationsByKey.value[value])
    const handleOperationRemove = value => remove(state.operationList, operation => operation.value === value)

    return {
      availableOperations,
      handleOperationSelect,
      handleOperationRemove,
      selectedOperation,
      calculatedFees,
      formatCurrency,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss">
.v-fee-calculator {
  display: grid;
  grid-gap: 20px;

  td:first-child {
    width: 200px;
  }

  .el-form-item__label {
    line-height: 1;
  }

  &__tag-list {
    transform: scale(1.2);
    transform-origin: 0 0;

    i {
      font-size: 24px;
      color: var(--el-color-primary);
    }

    .el-form-item__content {
      display: flex;
      grid-gap: 10px;
    }
  }

  &__card {
    &-placeholder {
      text-align: center;
      line-height: 1.4;
      margin: auto;
      max-width: 400px;
    }
  }

  &__buttons {
    .el-form-item__content {
      margin: 0 -5px;
      flex-wrap: wrap;
      display: flex;
    }

    .el-button {
      margin: 5px;
    }
  }

  &__tag-item {
    display: flex;
    grid-gap: 10px;
    align-items: center;
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
