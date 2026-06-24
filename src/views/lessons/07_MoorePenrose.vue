<template>
  <LessonLayout :lesson-id="7" title="Moore-Penrose广义逆" subtitle="Moore-Penrose Inverse">
    <Section num="1" title="广义逆的引入">
      <p>
        当 <span class="formula-inline">A</span> 不是方阵或奇异时，逆矩阵不存在。Moore-Penrose 广义逆
        <span class="formula-inline">A^+</span> 将逆矩阵的概念推广到任意矩阵，在最小二乘、优化等领域有广泛应用。
      </p>
    </Section>

    <Section num="2" title="Penrose方程">
      <Theorem title="Moore-Penrose四个条件" type="definition" icon="🔮">
        设 <span class="formula-inline">A\in\mathbb{C}^{m\times n}</span>，若 <span class="formula-inline">X\in\mathbb{C}^{n\times m}</span> 满足：
        <ol>
          <li><span class="formula-inline">AXA = A</span>（<span class="formula-inline">AX</span> 是沿 <span class="formula-inline">N(A)</span> 到 <span class="formula-inline">R(A)</span> 的投影）</li>
          <li><span class="formula-inline">XAX = X</span>（<span class="formula-inline">XA</span> 是幂等的）</li>
          <li><span class="formula-inline">(AX)^H = AX</span>（<span class="formula-inline">AX</span> 是 Hermite 的）</li>
          <li><span class="formula-inline">(XA)^H = XA</span>（<span class="formula-inline">XA</span> 是 Hermite 的）</li>
        </ol>
        则称 <span class="formula-inline">X</span> 为 <span class="formula-inline">A</span> 的 M-P 广义逆，记为 <span class="formula-inline">A^+</span>。
      </Theorem>
      <Theorem title="存在唯一性" type="theorem">
        对任意矩阵 <span class="formula-inline">A</span>，M-P 广义逆 <span class="formula-inline">A^+</span> 存在且唯一。
      </Theorem>
    </Section>

    <Section num="3" title="A⁺的SVD构造">
      <Theorem title="利用SVD求A⁺" type="theorem">
        设 <span class="formula-inline">A = U\Sigma V^H</span> 为 <span class="formula-inline">A</span> 的奇异值分解，则
        <Formula display>A^+ = V\Sigma^+ U^H</Formula>
        其中 <span class="formula-inline">\Sigma^+</span> 是将 <span class="formula-inline">\Sigma</span> 中非零奇异值取倒数后转置得到的矩阵。
      </Theorem>
    </Section>

    <Section num="4" title="广义逆与最小二乘">
      <Theorem title="极小范数最小二乘解" type="theorem">
        矛盾方程组 <span class="formula-inline">Ax=b</span> 的极小范数最小二乘解唯一存在，且为
        <Formula display>x = A^+ b</Formula>
        其中 <span class="formula-inline">x</span> 同时满足 <span class="formula-inline">\|Ax-b\| = \min</span> 和 <span class="formula-inline">\|x\| = \min</span>。
      </Theorem>
    </Section>

    <Section title="📌 知识点小结">
      <Steps :steps="[
        'M-P广义逆 A⁺ 由四个Penrose方程定义，存在且唯一',
        'A⁺ 同时满足 AXA=A, XAX=X, (AX)ᴴ=AX, (XA)ᴴ=XA',
        'SVD构造：A=UΣVᴴ ⟹ A⁺=VΣ⁺Uᴴ（非零奇异值取倒数）',
        'A⁺b 是 Ax=b 的极小范数最小二乘解',
        'A 可逆时 A⁺ = A⁻¹；A 列满秩时 A⁺ = (AᴴA)⁻¹Aᴴ'
      ]" />
    </Section>
  </LessonLayout>
</template>

<script setup>
import LessonLayout from '../../components/LessonLayout.vue'
import Section from '../../components/ui/Section.vue'
import Formula from '../../components/ui/Formula.vue'
import Theorem from '../../components/ui/Theorem.vue'
import Steps from '../../components/ui/Steps.vue'
import { useKatex } from '../../composables/useKatex'
import { onMounted } from 'vue'

const { render } = useKatex()
onMounted(() => { render() })
</script>
