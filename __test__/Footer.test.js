import {mount} from 'enzyme'
import React from 'react'
import {Provider} from 'mobx-react'
import {en} from './i18n.js'
import Footer from 'components/footer'
import stores from 'stores'

describe('components/Footer', function () {
  it('should render with i18n text corretly', () => {
    const wrapper = mount(<Provider {...stores}><Footer /></Provider>)
    const span = wrapper.find('span')
    expect(span.length).toBe(1)
    expect(span.at(0).text()).toBe(en.description.part1)
  })
})
