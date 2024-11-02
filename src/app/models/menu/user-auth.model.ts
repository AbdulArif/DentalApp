
export class AuthMenuGroup {
  menuGroupId!: string
  menuGroupName!: string
  icon!: string
  bsTargetId!: string
  expandIcon!: string
  collapseIcon!: string
  mainMenus!: MainMenu[]
  checked!: boolean
  haveSubMenuIcon!: boolean
  userId!: string
  addedBy!: string
  addedDate!: string
}

export class MainMenu {
  mainMenuId!: string
  mainMenuName!: string
  icon!: string
  routerLink!: string
  bsTargetId!: string
  expandIcon!: string
  collapseIcon!: string
  subMenus!: SubMenu[]
  checked!: boolean
  haveSubMenuIcon!: boolean
}

export class SubMenu {
  subMenuId!: string 
  subMenuName!: string
  icon!: string
  routerLink!: string
  checked!: boolean ;
}
