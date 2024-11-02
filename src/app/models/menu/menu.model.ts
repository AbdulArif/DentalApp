export class MenuGroup {
    menuGroupId!: string;
    menuGroupName!: string;
    icon!: string;
    bsTargetId!: string;
    expandIcon!: string;
    collapseIcon!: string;
    mainMenus!: MainMenu[];
}

export class MainMenu {
    mainMenuId!: string;
    mainMenuName!: string;
    icon!: string;
    routerLink!: string;
    bsTargetId!: string;
    expandIcon!: string;
    collapseIcon!: string;
    subMenus!: SubMenu[];
    purchased!: boolean;
    ordered!: boolean
}

export class SubMenu {
    subMenuId!: string;
    subMenuName!: string;
    icon!: string;
    routerLink!: string;
}