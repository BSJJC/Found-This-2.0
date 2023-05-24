import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Logo from "@/components/Common/Logo.vue";

describe('Logo', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(Logo, {
      props: {
        enableGoToHomePage: true,
      },
    });

    expect(wrapper.html()).toContain('Found');
    expect(wrapper.html()).toContain('this');
    expect(wrapper.html()).toContain('!');
  });

  it('does not navigate when enableGoToHomePage is false', async () => {
    const pushMock = vi.fn();

    const wrapper = mount(Logo, {
      props: {
        enableGoToHomePage: false,
      },
      mocks: {
        $router: {
          push: pushMock,
        },
      },
    });

    await wrapper.trigger('click');

    expect(pushMock).not.toHaveBeenCalled();

    expect(wrapper.html()).toContain('Found');
    expect(wrapper.html()).toContain('this');
    expect(wrapper.html()).toContain('!');
  });
});
